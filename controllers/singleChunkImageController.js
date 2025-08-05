const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '..', 'uploads');
const tempPath = path.join(__dirname, '..', 'temp');

exports.uploadSingleImageChunk = async (req, res) => {
  // Step 1: Decode Basic Auth
  const authHeader = req.headers['authorization'];

  console.log("headers:", authHeader);
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Missing Authorization' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const [iccid, password] = credentials.split(':');

  if (!iccid || !password) {
    return res.status(400).json({ error: 'Invalid Authorization format' });
  }

  // Step 2: Parse chunk info
  const chunkIndex = parseInt(req.headers['x-chunk-index'], 10);
  const totalChunks = parseInt(req.headers['x-total-chunks'], 10);
  const isLastChunk = chunkIndex === totalChunks - 1;

  if (isNaN(chunkIndex) || isNaN(totalChunks) || !req.body || !req.body.length) {
    return res.status(400).json({ error: 'Missing or invalid chunk data' });
  }

  // Step 3: Unique temp file per ICCID
  const tempFile = path.join(tempPath, `${iccid}.part`);
  fs.appendFileSync(tempFile, req.body);

  // Step 4: Wait for all chunks
  if (!isLastChunk) {
    return res.json({ message: 'Chunk received', chunkIndex });
  }

  // Step 5: Final save using ICCID + timestamp
  const finalFilename = `${iccid}_${Date.now()}.jpg`;
  const finalFilePath = path.join(uploadPath, finalFilename);
  fs.renameSync(tempFile, finalFilePath);

  const baseUrl = req.protocol + '://' + req.get('host');
  const imageUrl = `${baseUrl}/uploads/${finalFilename}`;

  return res.json({ message: 'Image uploaded', url: imageUrl, iccid });
};
