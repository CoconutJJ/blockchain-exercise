
const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

describe("Lottery Contract", () => {

    /**
     * 
     * @returns {Promise<[Object, Object, Contract, Contract]>}
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

    it("should allow owner to change the manager role", async () => {

        let [owner, user, MokContract, LotteryContract] = await setupContracts();
        try {
            await LotteryContract.connect(owner).changeManager(owner.address, user.address)
        } catch (e) {
            console.log(e)
            expect.fail("Could not change manager role as owner");
        }
    });

    it("should not allow non-owner to change the manager role", async () => {

        let [owner, user, MokContract, LotteryContract] = await setupContracts();
        try {
            await LotteryContract.connect(user).changeManager(owner.address, user.address)
            expect.fail("Non-owner can change manager role!");
        } catch (e) {

        }
    });

    it("should allow owner to set the ticket price", async () => {
        let [owner, user, MokContract, LotteryContract] = await setupContracts();
        const weiPrice = ethers.utils.formatUnits(ethers.BigNumber.from(30), "wei");

        try {
            await LotteryContract.setPrice(weiPrice);
        } catch (e) {
            console.log(e)
            expect.fail("Owner cannot change ticket price")
        }
    })
    it("should not allow non-owner to set the ticket price", async () => {
        let [owner, user, MokContract, LotteryContract] = await setupContracts();
        const weiPrice = ethers.utils.formatUnits(ethers.BigNumber.from(30), "wei");

        try {
            await LotteryContract.setPrice(weiPrice);
            expect.fail("Non-owner can change ticket price")
        } catch (e) {
        }
    })


    it("should allow owner to set the usage fee rate", async () => {
        let [owner, user, MokContract, LotteryContract] = await setupContracts();
        const weiPrice = ethers.utils.parseEther("0.1");
        
        try {
            await LotteryContract.setUsageFee(weiPrice);
        } catch (e) {
            console.log(e)

            expect.fail("Owner cannot change usage fee rate")
        }
    })

    it("should not allow non-owner to set the usage fee rate", async () => {
        let [owner, user, MokContract, LotteryContract] = await setupContracts();
        const weiPrice = ethers.utils.parseEther("0.1");

        try {
            await LotteryContract.setUsageFee(weiPrice);
            expect.fail("Non-owner can change usage fee rate")
        } catch (e) {
        }
    })
})
