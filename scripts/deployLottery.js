async function main() {
    
    let owner = "0xdA79f73fA1A38982d638BB6e45D4ff06BcF46cA3"
    let mokAddress = "0x6424cfBce3B00de23E86e7965ee8F6C2564dA8D4";
    const Lottery = await ethers.getContractFactory("Lottery");
    const lotteryPromise = await Lottery.deploy(owner, owner, owner, mokAddress);

    console.log(lotteryPromise.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
