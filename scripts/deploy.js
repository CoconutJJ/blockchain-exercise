async function main() {
    
    let owner = "0xdA79f73fA1A38982d638BB6e45D4ff06BcF46cA3"

    // We get the contract to deploy
    const Mok = await ethers.getContractFactory("MokToken");
    const mokPromise = await Mok.deploy("MOK", "MOK");

    console.log(mokPromise.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
