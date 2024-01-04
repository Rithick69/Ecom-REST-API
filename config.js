const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DBuri: process.env.MongoDB_URL,
    port: process.env.PORT
  };