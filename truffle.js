const { infurakey, infuramnemonic, infuraendpoint } = require('./config');

const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = infurakey;
//
// const fs = require('fs');
const mnemonic = infuramnemonic;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/17b65319c44a48bc98040d5678cb9a2f"),
        network_id: 4,       // rinkeby's id
        gas: 6600000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    },
  }
};
