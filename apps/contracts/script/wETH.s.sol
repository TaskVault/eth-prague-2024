// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import {OwnWETH} from "./mocks/wETH.sol";

// Configuring for base sepolia
contract OwnETH is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        OwnWETH tokenSubmission = new OwnWETH();
        vm.stopBroadcast();
    }
}
