// config.js
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  infurakey: process.env.INFURA_KEY,
  infuramnemonic: process.env.INFURA_MNEMONIC,
  infuraendpoint: process.env.INFURA_ENDPOINT
};
