require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Import routes
const signupRoute = require('./api/signup/route');
const loginRoute = require('./api/login/route');
const campRoute = require('./api/camp/route');
const leadRoute = require('./api/lead/route');

// Use routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/api/camp', campRoute);
app.use('/api/lead', leadRoute);

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});