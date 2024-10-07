const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const db = require("./db/db");

const userAuth = require("./routes/authRoute");
const riminder = require("./routes/reminder");
const admin = require("./routes/admin");

const errorHandler = require("./middleware/errorHandler");
const pageNotFound = require("./middleware/pageNotFound");

// extra packages
app.use(express.json());
app.use(cors());

// routes
app.use("/api", userAuth);
app.use("/api", riminder);
app.use("/api", admin);

// middleware
app.use(pageNotFound);
app.use(errorHandler);

const start = async () => {
  try {
    await db(process.env.PORT_URI);
    app.listen(process.env.PORT, () => console.log("server is running . . .", process.env.PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
