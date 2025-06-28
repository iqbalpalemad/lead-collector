const mongoose = require('mongoose');

const LEAD_STATUS_VALUES = ['new', 'pending', 'waiting for payment', 'confirmed', 'cancelled'];

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: false },
  phone: { type: String, required: true },
  countryCode: { type: String, required: false, default: '+91' },
  status: { type: String, enum: LEAD_STATUS_VALUES, default: 'new', required: true },
  camp: { type: mongoose.Schema.Types.ObjectId, ref: 'Camp', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  note: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

LeadSchema.statics.STATUS_VALUES = LEAD_STATUS_VALUES;

module.exports = mongoose.model('Lead', LeadSchema);
module.exports.STATUS_VALUES = LEAD_STATUS_VALUES;
