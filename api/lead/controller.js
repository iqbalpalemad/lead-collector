const Lead = require('../../models/Lead');
const Camp = require('../../models/Camp');

exports.createLead = async (req, res) => {
  try {
    const { name, phone, camp, note } = req.body;
    if (!name || !phone || !camp) {
      return res.status(400).json({
        result: false,
        data: null,
        error: 'name, phone, and camp are required'
      });
    }
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    // Check camp exists
    const campExists = await Camp.findById(camp);
    if (!campExists) return res.status(404).json({
      result: false,
      data: null,
      error: 'Camp not found'
    });
    // Status is always 'new', assignedTo is null
    const lead = new Lead({ name, phone, camp, note, status: 'new', assignedTo: null, createdBy: userId, updatedBy: userId });
    await lead.save();
    res.status(201).json({
      result: true,
      data: lead
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const { STATUS_VALUES } = require('../../models/Lead');

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note, name, phone } = req.body;
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    // Only allow valid statuses
    if (status && !STATUS_VALUES.includes(status)) {
      return res.status(400).json({ result: false, data: null, error: 'Invalid status' });
    }
    const update = { updatedBy: userId };
    if (status) update.status = status;
    if (note !== undefined) update.note = note;
    if (name !== undefined) update.name = name;
    if (phone !== undefined) update.phone = phone;
    update.assignedTo = userId;
    const lead = await Lead.findByIdAndUpdate(
      id,
      update,
      { new: true }
    );
    if (!lead) return res.status(404).json({
      result: false,
      data: null,
      error: 'Lead not found'
    });
    res.json({
      result: true,
      data: lead
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.listLeads = async (req, res) => {
  try {
    const { campId } = req.params;
    const leads = await Lead.find(
      { camp: campId },
      { name: 1, phone: 1, status: 1, assignedTo: 1, note: 1 }
    ).populate('assignedTo', 'username');
    res.json({
      result: true,
      data: leads
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
