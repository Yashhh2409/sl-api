// controllers/recentImageController.js
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '..', 'uploads');

exports.getRecentImageByICCID = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Missing Authorization' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [iccid] = credentials.split(':');

    if (!iccid) {
      return res.status(400).json({ error: 'Invalid ICCID' });
    }

    const files = fs.readdirSync(uploadPath);

    const userFiles = files
      .filter(file => file.startsWith(iccid + '_') && file.endsWith('.jpg'))
      .sort((a, b) => {
        const aTime = parseInt(a.split('_')[1]);
        const bTime = parseInt(b.split('_')[1]);
        return bTime - aTime; // most recent first
      });

    if (userFiles.length === 0) {
      return res.status(404).json({ error: 'No image found for this ICCID' });
    }

    const recentFile = userFiles[0];
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${recentFile}`;

    return res.json({ iccid, imageUrl });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
