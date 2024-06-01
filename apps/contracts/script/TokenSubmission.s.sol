// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import {TokenSubmission} from "../src/TokenSubmission.sol";

// Configuring for  ETH Sepolia
contract TokenSubmissionScript is Script {
    address constant WETH_ADDRESS = address(0x4458c2dB566Ae8a30625de55fEa1231D27238A0C);
    uint256 constant WETH_TARGET_AMOUNT = 5 ether;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        TokenSubmission tokenSubmission = new TokenSubmission(WETH_TARGET_AMOUNT, WETH_ADDRESS);
        vm.stopBroadcast();
    }
}
