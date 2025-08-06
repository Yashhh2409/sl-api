const moment = require("moment-timezone"); // npm install moment-timezone

exports.handleBootup = async (req, res) => {
  try {
    const { key, bat } = req.body;

    if (!key || !bat) {
      return res.status(400).send("Missing 'key' or 'bat' in body");
    }

    console.log("India Time:", moment().tz("Asia/Kolkata").format());
console.log("Taiwan Time:", moment().tz("Asia/Taipei").format());

    // Get current time in Taiwan (Asia/Taipei)
    const taiwanTime = moment().tz("Asia/Taipei").format("YYYY-MM-DD HH:mm:ss");

    // Hardcoded data (can be replaced later)
    const staticData = "4&plan=31&manager=2663,2664,2661";

    // Final string response
    const responseString = `utc=${taiwanTime} ${staticData}`;

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
