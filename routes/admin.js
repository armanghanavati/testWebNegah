const express = require("express");
const router = express.Router();
const { adminUser } = require("../controller/adminControl");

router.route("/addUser").post(adminUser);

module.exports = router;
