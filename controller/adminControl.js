const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../model/userModel");

const adminUser = asyncWrapper(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }
  const { username, password, role } = req.body;
  const user = new User({ username, password, role });
  await user.save();
  res.send("User added successfully");
});

module.exports = {
  adminUser,
};
