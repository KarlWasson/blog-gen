const cors = require('cors');

module.exports = cors({
  origin: 'http://accessibletechwriting.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
