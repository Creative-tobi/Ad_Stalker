const express = require("express");
const cors = require("cors");
require("dotenv").config();

const campaignRoutes = require("./routes/campaignRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/campaigns", campaignRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
