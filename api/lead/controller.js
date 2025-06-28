const Lead = require('../../models/Lead');
const Camp = require('../../models/Camp');

exports.createLead = async (req, res) => {
  try {
    let { name, phone, camp, note, countryCode } = req.body;
    if (!phone || !camp) {
      return res.status(400).json({
        result: false,
        data: null,
        error: 'phone and camp are required'
      });
    }
    if (!countryCode) countryCode = '+91';
    
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    // Check camp exists
    const campExists = await Camp.findById(camp);
    if (!campExists) return res.status(404).json({
      result: false,
      data: null,
      error: 'Camp not found'
    });
    // Prevent duplicate phone numbers with same country code
    const existingLead = await Lead.findOne({ phone, countryCode });
    if (existingLead) {
      return res.status(409).json({
        result: false,
        data: null,
        error: 'A lead with this phone number already exists.'
      });
    }
    // Status is always 'new', assignedTo is null
    const lead = new Lead({ name, phone, camp, note, countryCode, status: 'new', assignedTo: null, createdBy: userId, updatedBy: userId });
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
    const { status, note, name, phone, countryCode } = req.body;
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
    if (phone !== undefined || countryCode !== undefined) {
      // Prevent duplicate phone+countryCode on update (ignore current lead)
      const leadToUpdate = await Lead.findById(id);
      const newPhone = phone !== undefined ? phone : leadToUpdate.phone;
      let newCountryCode;
      if (countryCode !== undefined) {
        newCountryCode = countryCode || '+91';
      } else {
        newCountryCode = leadToUpdate.countryCode || '+91';
      }
      if (newPhone !== leadToUpdate.phone || newCountryCode !== leadToUpdate.countryCode) {
        const duplicate = await Lead.findOne({ phone: newPhone, countryCode: newCountryCode, _id: { $ne: id } });
        if (duplicate) {
          return res.status(409).json({
            result: false,
            data: null,
            error: 'A lead with this phone number and country code already exists.'
          });
        }
      }
      if (phone !== undefined) update.phone = phone;
      if (countryCode !== undefined) update.countryCode = countryCode || '+91';
    }
    update.assignedTo = userId;
    let lead = await Lead.findByIdAndUpdate(
      id,
      update,
      { new: true }
    );
    if (!lead) return res.status(404).json({
      result: false,
      data: null,
      error: 'Lead not found'
    });
    lead = await lead.populate('assignedTo', 'username');
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
      { name: 1, phone: 1, countryCode: 1, status: 1, assignedTo: 1, note: 1 }
    ).populate('assignedTo', 'username');
    res.json({
      result: true,
      data: leads
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
