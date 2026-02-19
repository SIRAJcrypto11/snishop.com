const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SNISHOP NETWORK", function () {
    it("Should have the correct metadata and supply", async function () {
        const [owner] = await ethers.getSigners();
        const SNISHOP = await ethers.getContractFactory("SNISHOPNETWORK");
        const snishop = await SNISHOP.deploy();

        expect(await snishop.name()).to.equal("SNISHOP NETWORK");
        expect(await snishop.symbol()).to.equal("SNISHOP");

        // 1,000,000,000 tokens * 10^18 decimals
        const expectedSupply = ethers.parseUnits("1000000000", 18);
        expect(await snishop.totalSupply()).to.equal(expectedSupply);
        expect(await snishop.balanceOf(owner.address)).to.equal(expectedSupply);
    });
});
