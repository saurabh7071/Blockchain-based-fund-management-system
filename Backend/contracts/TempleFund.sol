// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./TempleRegistry.sol";

contract TempleFund {
    // Reference to the TempleRegistry contract
    TempleRegistry public templeRegistry;

    // Mapping to track funds donated to each temple
    mapping(address => uint256) public templeFunds;

    // Event for logging donations
    event DonationReceived(address indexed donor, address indexed temple, uint256 amount);
    event FundsWithdrawn(address indexed temple, uint256 amount);

    // Constructor to initialize with the TempleRegistry contract address
    constructor(address _templeRegistry) {
        require(_templeRegistry != address(0), "Invalid registry address");
        templeRegistry = TempleRegistry(_templeRegistry);
    }

    // Function to donate funds to a registered temple
    function donateToTemple(address temple) external payable {
        require(msg.value > 0, "Donation amount must be greater than zero");
        require(templeRegistry.checkTemple(temple), "Temple is not registered");

        // Add the donation amount to the temple's fund
        templeFunds[temple] += msg.value;

        emit DonationReceived(msg.sender, temple, msg.value);
    }

    // Function for temple authority to withdraw funds
    function withdrawFunds(uint256 amount) external {
        require(templeRegistry.checkTemple(msg.sender), "Only registered temple can withdraw");
        require(amount > 0, "Withdraw amount must be greater than zero");
        require(templeFunds[msg.sender] >= amount, "Insufficient funds");

        // Deduct the amount and transfer to the temple authority
        templeFunds[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        emit FundsWithdrawn(msg.sender, amount);
    }

    // Function to get the fund balance of a specific temple
    function getTempleBalance(address temple) external view returns (uint256) {
        return templeFunds[temple];
    }
}