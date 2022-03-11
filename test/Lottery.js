
const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

describe("Lottery Contract", () => {

    /**
     * 
     * @returns {Promise<[String, Contract, Contract]>}
     */
    let setupContracts = async () => {
        const [owner, user] = await ethers.getSigners();

        const Mok = await ethers.getContractFactory("MokToken");
        const Lottery = await ethers.getContractFactory("Lottery");

        const MokContract = await Mok.deploy("MOK", "MOK");
        const LotteryContract = await Lottery.deploy(owner.address, owner.address, MokContract.address);

        const approval = await MokContract.connect(owner).approve(LotteryContract.address, MokContract.totalSupply());

        await approval.wait();

        return [owner, user, MokContract, LotteryContract]
    }


    it("should should buy ticket and insert player address into player array", async () => {

        let [owner, user, MokContract, LotteryContract] = await setupContracts();

        await LotteryContract.buyTicket(1);

        let address = await LotteryContract._players(0);

        expect(address).to.equal(owner.address);
    });

    it("should only allow owner to choose winner", async () => {
        let [owner, user, MokContract, LotteryContract] = await setupContracts();

        await network.provider.send("evm_increaseTime", [3600])

        await LotteryContract.buyTicket(1);


        try {
            await LotteryContract.connect(owner).chooseWinner();

        } catch (e) {
            console.log(e)
            expect.fail("Owner was not allowed to choose winner!");
        }

    })

    it("should NOT allow user to choose winner", async () => {
        let [owner, user, MokContract, LotteryContract] = await setupContracts();

        await network.provider.send("evm_increaseTime", [3600])

        await LotteryContract.buyTicket(1);

        try {
            await LotteryContract.connect(user).chooseWinner();
            expect.fail("User was allowed to choose winner!");
        } catch (e) {

        }
    })

    it("should only allow owner to collect usage fees", async () => {

        let [owner, user, MokContract, LotteryContract] = await setupContracts();

        await LotteryContract.buyTicket(1);

        try {
            await LotteryContract.connect(owner)._usage_fees()
        } catch (e) {
            expect.fail("Could not collect usage fees as owner!");
        }

    })

})
