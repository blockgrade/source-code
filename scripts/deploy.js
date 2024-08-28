const hre = require('hardhat');

async function main() {
    const GradeRegistry = await hre.ethers.getContractFactory("GradeRegistry");
    const GradeRegistryContract = await GradeRegistry.deploy();

    await GradeRegistryContract.waitForDeployment();

    console.log('Contract Address:', await GradeRegistryContract.getAddress());
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
