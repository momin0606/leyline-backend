const { User } = require("../models");

const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: { [require("sequelize").Op.ne]: req.user.id },
      },
      attributes: ["id", "username", "fullname"],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { listUsers };
