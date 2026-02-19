require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const isPrivateKeyValid = PRIVATE_KEY && PRIVATE_KEY.length === 66 && PRIVATE_KEY.startsWith("0x");

const accounts = isPrivateKeyValid ? [PRIVATE_KEY] : [];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.20",
    networks: {
        blockdag: {
            url: "http://rpc.bdagscan.com/",
            chainId: 1404,
            accounts: accounts,
        },
        blockdag_testnet: {
            url: "https://rpc.awakening.bdagscan.com",
            chainId: 1043,
            accounts: accounts,
        }
    },
};
