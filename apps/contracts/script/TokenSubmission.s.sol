// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import {TokenSubmission} from "../src/TokenSubmission.sol";

// Configuring for base sepolia
contract TokenSubmissionScript is Script {
    address constant WETH_ADDRESS = address(0x0A6BAD2bD46F0574beA4330b617834cC153184c7);
    uint256 constant WETH_TARGET_AMOUNT = 5 ether;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        TokenSubmission tokenSubmission = new TokenSubmission(WETH_TARGET_AMOUNT, WETH_ADDRESS);
        vm.stopBroadcast();
    }
}
