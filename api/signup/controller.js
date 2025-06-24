const User = require('../../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      result: false,
      data: null,
      error: 'Username and password required.'
    });
  }
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({
        result: false,
        data: null,
        error: 'Username already exists.'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({
      result: true,
      data: { message: 'User registered successfully.' }
    });
  } catch (err) {
    res.status(500).json({
      result: false,
      data: null,
      error: 'Server error.'
    });
  }
};
