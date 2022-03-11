import { ethers, utils } from "ethers"
import lotAbi from "../abis/Lottery.json"
import mokAbi from "../abis/MokToken.json"
const BlockChain = {

    provider: null,
    lottery_contract_address: "0x57eB6BC7e7da7904c27E00D14e581bA24024d357",
    token_contract_address: "0xF81Dc71AAa15dc8A40b75aE65550379BeEB27f92",
    client_address: null,
    lottery_contract: null,
    token_contract: null,
    getMokAbi: () => {
        return mokAbi.abi
    },

    connectToMetaMask: async () => {
        BlockChain.provider = new ethers.providers.Web3Provider(window.ethereum);

        try {
            let addresses = await BlockChain.provider.send("eth_requestAccounts", [])

            BlockChain.client_address = addresses[0];
            await BlockChain.attachMokContract();

            return true;
        } catch (e) {
            console.log(e)
            return false;
        }

    },

    attachMokContract: async () => {
        BlockChain.token_contract = new ethers.Contract(BlockChain.token_contract_address, JSON.stringify(mokAbi.abi), BlockChain.provider.getSigner());
        BlockChain.lottery_contract = new ethers.Contract(BlockChain.lottery_contract_address, JSON.stringify(lotAbi.abi), BlockChain.provider.getSigner());

        await BlockChain.willApprove();

    },

    getJackpot: async () => {
        let {_hex} = await BlockChain.lottery_contract._jackpot();
        
        return ethers.BigNumber.from(_hex).toNumber();
    
    },

    getNextDrawTime: async () => {
        let { _hex } = await BlockChain.lottery_contract._last_draw_time();

        let time = ethers.BigNumber.from(_hex);

        return time.toNumber() + 5 * 60;
    },

    willApprove: async () => {

        let _currentApprovedAmount = await BlockChain.token_contract.allowance(BlockChain.lottery_contract_address, BlockChain.client_address);


        let _totalSupply = await BlockChain.token_contract.totalSupply();

        console.log(_currentApprovedAmount, _totalSupply);
        if (_currentApprovedAmount != _totalSupply) {
            let approval = await BlockChain.token_contract.approve(BlockChain.lottery_contract_address, _totalSupply);

            await approval.wait();
        }


    },

    buyTicket: async () => {

        await BlockChain.lottery_contract.buyTicket(1);
    },

    chooseWinner: async () => {
        try {
            await BlockChain.lottery_contract.chooseWinner()
        } catch (e) {
            console.log(e);
        }

    }

}

export default BlockChain;


