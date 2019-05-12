
const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = INFURA_KEY;
//
// const fs = require('fs');
const mnemonic = INFURA_MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, INFURA_ENDPOINT),
        network_id: 4,       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    },
  }
};
