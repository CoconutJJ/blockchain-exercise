
require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/e3068c2dae0e4686a8556658386d34f8`,
      accounts: ["dd62a718f6a68e8ff924829752c8e9756d2ddaba8529f60e4d9a7af468e506f3"]
    }
  }
};
