const hre = require("hardhat");

async function main() {
    // Existing SNISHOP Token Address on BlockDAG Mainnet
    const snishopTokenAddress = "0x960B6DDb29dA4eC483234e9216CFb8B4407cC640";

    // Rate: 1 BDAG = 1000 SNISHOP
    const rate = 1000;

    console.log("Deploying SNISHOPPresale contract...");
    const presale = await hre.ethers.deployContract("SNISHOPPresale", [snishopTokenAddress, rate]);

    await presale.waitForDeployment();

    console.log(
        `SNISHOPPresale deployed to ${presale.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
