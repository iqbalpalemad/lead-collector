const User = require('../../models/User');

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({}, { username: 1 });
    res.json({
      result: true,
      data: users
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
