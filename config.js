const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DBuri: process.env.MongoDB_URL,
    port: process.env.PORT,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN
  };