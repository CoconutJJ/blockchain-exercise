const MokToken = artifacts.require("MokToken.sol");
const Lottery = artifacts.require("Lottery.sol");
const {ethers} = require("ethers");
module.exports = async function (deployer) {
    await deployer.deploy(MokToken, "MOK", "MOK");
    let ownerAddress = "0xdA79f73fA1A38982d638BB6e45D4ff06BcF46cA3"
    await deployer.deploy(Lottery, ownerAddress, ownerAddress, ownerAddress, MokToken.address);   
}