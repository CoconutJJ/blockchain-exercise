import { ethers } from "ethers";
import BlockChain from "./blockchain";
class LotteryContract {

    /**
     * 
     * @param {string} address 
     * @param {object} abi 
     * @param {ethers.providers.Web3Provider} provider 
     */
    constructor(address, abi, provider) {

        this.address = address;
        /**
         * @type {ethers.providers.Web3Provider}
         */
        this.provider = provider;
        this.abi = abi;

        this.contract = new ethers.Contract(this.address, this.abi, this.provider);
    }

    static buyTicket() {
        this.contract.connect(this.provider.getSigner());
    }
    
    

}

