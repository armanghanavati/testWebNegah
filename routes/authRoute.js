const express = require("express");
const router = express.Router();
const { login, dashboard, register } = require("../controller/authControl");
const authorizationMidd = require("../middleware/auth");

router.route("/dashboard").get(authorizationMidd, dashboard);
router.route("/login").post(login);
router.route("/register").post(register);

module.exports = router;