// controllers/eventLogsController.js

exports.eventLogsController = async (req, res) => {
  try {
    const { event, iccid } = req.body;

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

    console.log("Event received:", event, "ICCID:", iccid);

    return res.json({
      success: true,
      event,
      iccid,
      message: "Event logged successfully",
    });
  } catch (error) {
    console.error("Event log error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
