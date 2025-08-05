export const eventLogsController = async () => {
  try {
    const body = await req.json();
    const { event, iccid } = body;

    if (!event || !iccid) {
      return res.json(
        { success: false, message: "Missing event or iccid" },
        { status: 400 }
      );
    }

    const validEvents = [
      "KEY_RELEASE_BTN_CLICKED",
      "SHACKLE_RELEASE_BTN_CLICKED",
    ];
    if (!validEvents.includes(event)) {
      return res.json(
        { success: false, message: "Invalid event type" },
        { status: 400 }
      );
    }

    console.log("Event recieved: ", event, "ICCID:", iccid);

    return res.json({
      success: true,
      event: event,
      iccid: iccid,
      message: "Event logged successfully",
    });
  } catch (error) {
    console.error("Event log error:", error);
    return res.json({ success: false, message: "Internal Server error" });
  }
};
