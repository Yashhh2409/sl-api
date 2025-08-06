const moment = require("moment-timezone"); // npm install moment-timezone

exports.handleBootup = async (req, res) => {
  try {
    const { key, bat } = req.body;

    if (!key || !bat) {
      return res.status(400).send("Missing 'key' or 'bat' in body");
    }

    // Get current time in Taiwan (Asia/Taipei)
    const UTCTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");

    // Hardcoded data (can be replaced later)
    const staticData = "4&plan=31&manager=2663,2664,2661";

    // Final string response
    const responseString = `utc=${UTCTime} ${staticData}`;

    console.log("Incoming data:", { key, bat });
    console.log("Responding with:", responseString);

    // Send as plain text response
    res.set("Content-Type", "text/plain");
    return res.status(200).send(responseString);
  } catch (err) {
    console.error("Bootup error:", err);
    return res.status(500).send("Internal Server Error");
  }
};
