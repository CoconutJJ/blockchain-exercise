import { ethers, utils } from "ethers"
import mokAbi from "../abis/Lottery.json"
const BlockChain = {

    provider: null,
    contract: null,

    getMokAbi: () => {
        return mokAbi.abi
    },

    connectToMetaMask: async () => {
        BlockChain.provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            console.log(await BlockChain.provider.send("eth_requestAccounts", []));
            return true;
        } catch (e) {
            return false;
        }
    },

    attachMokContract: async () => {
        BlockChain.contract = new ethers.Contract("0xe51ce2c8979C818E9C5466E70e0d24F9A76EcE90", JSON.stringify(BlockChain.getMokAbi()), BlockChain.provider.getSigner())
    },

    getJackpot: async () => {
        return await BlockChain.contract.getJackpot();
    },

    getNextDrawTime: async () => {
        let { _hex } = await BlockChain.contract.getNextDrawTime();

        let time = ethers.BigNumber.from(_hex);

        return time.toNumber();
    },

    buyTicket: async () => {

        
        await BlockChain.contract.buyTicket(1);
    }


}

export default BlockChain;


