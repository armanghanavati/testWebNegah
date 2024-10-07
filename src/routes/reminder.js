const express = require("express");
const addReminder = require("../controller/reminderControl");
const router = express.Router();

router.route("/addReminder").post(addReminder);

module.exports = router;
