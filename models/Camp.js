const mongoose = require('mongoose');

const CampSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Camp', CampSchema);
