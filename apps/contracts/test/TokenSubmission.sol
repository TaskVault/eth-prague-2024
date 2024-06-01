// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import {MockERC20} from "solmate/test/utils/mocks/MockERC20.sol";
import {IHooks} from "v4-core/src/interfaces/IHooks.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {TickMath} from "v4-core/src/libraries/TickMath.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {BalanceDelta} from "v4-core/src/types/BalanceDelta.sol";
import {PoolId, PoolIdLibrary} from "v4-core/src/types/PoolId.sol";
import {CurrencyLibrary, Currency} from "v4-core/src/types/Currency.sol";
import {PoolSwapTest} from "v4-core/src/test/PoolSwapTest.sol";
import {Deployers} from "v4-core/test/utils/Deployers.sol";
import {TokenSubmission} from "../src/TokenSubmission.sol";

contract TokenSubmissionTest is Test, Deployers {
    using PoolIdLibrary for PoolKey;
    using CurrencyLibrary for Currency;

    TokenSubmission tokenSubmission;

    address WETH;

    function setUp() public {
        // creates the pool manager, utility routers, and test tokens
        Deployers.deployFreshManagerAndRouters();
        Deployers.deployMintAndApprove2Currencies();

        MockERC20 _WETH = new MockERC20("WETH", "WETH", 18);

        // Send some WETH
        console.log("Minter WETH: ", msg.sender);
        _WETH.mint(msg.sender, 20);

        WETH = address(_WETH);
    }

    function testTokenSubmission() public {
        // create the token submission contract
        tokenSubmission = new TokenSubmission(1, WETH);

        MockERC20(WETH).approve(address(tokenSubmission), 5);
        MockERC20(WETH).mint(msg.sender, 20);

        MockERC20(WETH).transfer(msg.sender, 5);
        // submit token ideas
        tokenSubmission.submitTokenIdea("Token1", "TKN1");

        // contribute and vote
        console.log("SUBMISION SENDER: ", msg.sender);

        // tokenSubmission.contributeAndVote(0, 1);

        // assertEq(tokenSubmission.targetAmount, 1000);
    }
}
