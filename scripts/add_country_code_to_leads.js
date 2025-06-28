require('dotenv').config();
const mongoose = require('mongoose');
const Lead = require('../models/Lead');
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MongoDB URI not found in environment variables.');
  process.exit(1);
}

async function updateLeadsCountryCode() {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const result = await Lead.updateMany(
      { countryCode: { $exists: false } },
      { $set: { countryCode: '+91' } }
    );
    console.log(`Updated ${result.modifiedCount} leads with countryCode +91.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error updating leads:', err);
    process.exit(1);
  }
}

updateLeadsCountryCode();
