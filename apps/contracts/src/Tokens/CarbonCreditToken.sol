// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract CarbonCreditToken is ERC20Burnable {
    constructor(uint256 initialSupply) ERC20("CarbonCreditToken", "CCR") {
        _mint(msg.sender, initialSupply);
    }
}
