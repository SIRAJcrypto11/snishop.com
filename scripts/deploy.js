const hre = require("hardhat");

async function main() {
    const snishop = await hre.ethers.deployContract("SNISHOPNETWORK");

    await snishop.waitForDeployment();

    console.log(
        `SNISHOP NETWORK deployed to ${snishop.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
