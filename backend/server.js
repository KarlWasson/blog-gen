require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const outlineRoute = require('./routes/outline');
const errorHandler = require('./middleware/error');
const corsHandler = require('./middleware/cors');

app.use(express.json());
app.use(corsHandler);
app.use('/', outlineRoute);
app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
