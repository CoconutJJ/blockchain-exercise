import { ethers, utils } from "ethers"
import lotAbi from "../abis/Lottery.json"
import mokAbi from "../abis/MokToken.json"
const BlockChain = {

    provider: null,
    lottery_contract_address: "0x8dF5F635f617Cea027196f18E9EE56dE6dEe7cbF",
    token_contract_address: "0x6424cfBce3B00de23E86e7965ee8F6C2564dA8D4",
    lottery_contract: null,
    token_contract: null,
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
        BlockChain.token_contract = new ethers.Contract(BlockChain.token_contract_address, JSON.stringify(mokAbi.abi), BlockChain.provider.getSigner());
        BlockChain.lottery_contract = new ethers.Contract(BlockChain.lottery_contract_address, JSON.stringify(lotAbi.abi), BlockChain.provider.getSigner());
    },

    getJackpot: async () => {
        return await BlockChain.lottery_contract.getJackpot();
    },

    getNextDrawTime: async () => {
        let { _hex } = await BlockChain.lottery_contract.getNextDrawTime();

        let time = ethers.BigNumber.from(_hex);

        return time.toNumber();
    },




    buyTicket: async () => {
        await BlockChain.token_contract.approve(BlockChain.lottery_contract_address, 20);
        // await BlockChain.lottery_contract.buyTicket(1);
    }


}

export default BlockChain;


