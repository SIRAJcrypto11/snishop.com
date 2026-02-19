// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SNISHOPPresale is Ownable, ReentrancyGuard {
    IERC20 public token;
    uint256 public rate; // Number of tokens per 1 BDAG (wei)
    bool public isPaused;

    event TokensPurchased(address indexed buyer, uint256 amountBDAG, uint256 amountTokens);
    event RateUpdated(uint256 newRate);
    event PresalePaused(bool status);
    event Withdrawal(address indexed owner, uint256 amount);
    event TokensWithdrawn(address indexed owner, uint256 amount);

    constructor(address _tokenAddress, uint256 _rate) Ownable(msg.sender) {
        token = IERC20(_tokenAddress);
        rate = _rate;
        isPaused = false;
    }

    // Buy tokens with BDAG (Native Coin)
    function buyTokens() public payable nonReentrant {
        require(!isPaused, "Presale is paused");
        require(msg.value > 0, "Send BDAG to buy tokens");

        uint256 tokensToBuy = msg.value * rate;
        uint256 contractBalance = token.balanceOf(address(this));

        require(contractBalance >= tokensToBuy, "Not enough tokens in reserve");

        token.transfer(msg.sender, tokensToBuy);
        
        emit TokensPurchased(msg.sender, msg.value, tokensToBuy);
    }

    // Owner Functions
    function setRate(uint256 _rate) external onlyOwner {
        rate = _rate;
        emit RateUpdated(_rate);
    }

    function setPaused(bool _status) external onlyOwner {
        isPaused = _status;
        emit PresalePaused(_status);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No BDAG to withdraw");
        payable(owner()).transfer(balance);
        emit Withdrawal(owner(), balance);
    }

    function withdrawTokens() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        token.transfer(owner(), balance);
        emit TokensWithdrawn(owner(), balance);
    }

    // Receive function to handle plain transfers
    receive() external payable {
        buyTokens();
    }
}
