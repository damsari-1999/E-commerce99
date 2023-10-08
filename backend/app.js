const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyPaeser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyPaeser.json({ extended: false }));

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.URL;

try {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
} catch (error) {
  console.log(error);
  process.exit(1);
}

app.use("/user", require("./Routes/UserRoutes"));
app.use("/item", require("./Routes/ItemRoutes"));

app.listen(PORT, () => console.log(`Backend is running on port ${PORT}`));
