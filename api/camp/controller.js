const Camp = require('../../models/Camp');

exports.createCamp = async (req, res) => {
  try {
    const { name, date } = req.body;
    if (!name || !date) {
      return res.status(400).json({
        result: false,
        data: null,
        error: 'name and date are required'
      });
    }
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({
      result: false,
      data: null,
      error: 'Unauthorized'
    });
    const camp = new Camp({ name, date, createdBy: userId, updatedBy: userId });
    await camp.save();
    res.status(201).json({
      result: true,
      data: camp
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.listCamps = async (req, res) => {
  try {
    const camps = await Camp.find({}, { name: 1, date: 1 }).sort({ createdAt: -1 });
    res.json({
      result: true,
      data: camps
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
