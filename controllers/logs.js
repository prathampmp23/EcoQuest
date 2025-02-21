const WasteLog = require("../models/WasteLog"); // Import the schema

app.post("/logs/submit", async (req, res) => {
  try {
    // Ensure the user is authenticated and get their ID
    const userId = req.user._id; // Assuming authentication middleware sets `req.user`

    // Validate required fields
    if (!req.body.image || !req.body.quantity) {
      return res.status(400).send("Image URL and quantity are required.");
    }

    // Create a new log entry
    const newLog = new WasteLog({
      userId: userId,
      image: req.body.image, // Directly storing the image URL
      quantity: parseFloat(req.body.quantity), // Convert to number
    });

    await newLog.save(); // Save to MongoDB

    res.redirect("/EcoQuest#"); // Redirect after submission
  } catch (error) {
    console.error("Error saving log:", error);
    res.status(500).send("Error submitting log.");
  }
});