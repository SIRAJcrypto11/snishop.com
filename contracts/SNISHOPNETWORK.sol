// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract SNISHOPNETWORK is ERC20, ERC20Permit, ERC20Burnable {
    constructor() ERC20("SNISHOP NETWORK", "SNISHOP") ERC20Permit("SNISHOP NETWORK") {
        // Mint 1 Milyar Token
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}
