const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        result: false,
        data: null,
        error: 'Invalid credentials.'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        result: false,
        data: null,
        error: 'Invalid credentials.'
      });
    }
    const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET);
    res.json({
      result: true,
      data: { token }
    });
  } catch (err) {
    res.status(500).json({
      result: false,
      data: null,
      error: 'Server error.'
    });
  }
};
