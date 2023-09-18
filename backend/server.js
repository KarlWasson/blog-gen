const path = require('path');
require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const outlineRoute = require('./routes/outline');
const errorHandler = require('./middleware/error');
const corsHandler = require('./middleware/cors');

// Existing middleware
app.use(express.json());
app.use(corsHandler);

// Your existing API routes
app.use('/', outlineRoute);

//serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

// Error handling
app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
