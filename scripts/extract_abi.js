const fs = require("fs");
const path = require("path");

async function main() {
    const artifactPath = path.join(
        __dirname,
        "../artifacts/contracts/SNISHOPNETWORK.sol/SNISHOPNETWORK.json"
    );

    if (!fs.existsSync(artifactPath)) {
        console.error("Artifact not found!");
        process.exit(1);
    }

    const artifact = require(artifactPath);
    const abi = artifact.abi;

    const frontendPath = path.join(__dirname, "../frontend/app/abi.json");

    fs.writeFileSync(frontendPath, JSON.stringify(abi, null, 2));
    console.log(`ABI extracted to ${frontendPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
