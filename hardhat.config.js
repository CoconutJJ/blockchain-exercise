
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/f133eaf6120442638ace6d9492d8cebd`,
      accounts: ["dd62a718f6a68e8ff924829752c8e9756d2ddaba8529f60e4d9a7af468e506f3"]
    }
  },
  etherscan: {
    apiKey: {
      ropsten: 'YAITFJWX5NICS88FB8P68VQXYIKRVV21WB'
    }
  }

};
