exports.eventLogs = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { event, iccid } = req.body;

    console.log("🚀 Received Event:", event); // ✅ Log event
  console.log("📱 ICCID:", iccid);           // ✅ Log iccid

    if (!event || !iccid) {
      return res.status(400).json({
        success: false,
        message: "Missing event or iccid",
      });
    }

    const validEvents = [
      "KEY_RELEASE_BTN_CLICKED",
      "SHACKLE_RELEASE_BTN_CLICKED",
    ];

    if (!validEvents.includes(event)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event type",
      });
    }

    // console.log("Event received:", event, "ICCID:", iccid);

    return res.status(200).json({
      success: true,
      event,
      iccid,
      message: "Event logged successfully",
    });
  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
