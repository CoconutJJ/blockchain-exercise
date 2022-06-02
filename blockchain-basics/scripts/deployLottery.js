async function main() {
    
    let owner = "0xdA79f73fA1A38982d638BB6e45D4ff06BcF46cA3"
    let mokAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const Lottery = await ethers.getContractFactory("Lottery");
    const lotteryPromise = await Lottery.deploy(owner, owner, mokAddress);

    console.log(lotteryPromise.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
