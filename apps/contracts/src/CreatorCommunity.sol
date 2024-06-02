// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import {BaseHook} from "v4-periphery/BaseHook.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "v4-core/src/types/PoolId.sol";
import {BalanceDelta} from "v4-core/src/types/BalanceDelta.sol";
import {BeforeSwapDelta, BeforeSwapDeltaLibrary} from "v4-core/src/types/BeforeSwapDelta.sol";

contract CreatorCommunity is BaseHook {
    using PoolIdLibrary for PoolKey;

    // NOTE: ---------------------------------------------------------
    // state variables should typically be unique to a pool
    // a single hook contract should be able to service multiple pools
    // ---------------------------------------------------------------

    constructor(IPoolManager _poolManager) BaseHook(_poolManager) {}

    address[] public owners;
    mapping(address => uint256) public ownersAllocations;

    function getHookPermissions() public pure override returns (Hooks.Permissions memory) {
        return Hooks.Permissions({
            beforeInitialize: false,
            afterInitialize: false,
            beforeAddLiquidity: false,
            afterAddLiquidity: false,
            beforeRemoveLiquidity: false,
            afterRemoveLiquidity: false,
            beforeSwap: false,
            afterSwap: true,
            beforeDonate: false,
            afterDonate: false,
            beforeSwapReturnDelta: false,
            afterSwapReturnDelta: false,
            afterAddLiquidityReturnDelta: false,
            afterRemoveLiquidityReturnDelta: false
        });
    }

    function addOwner(address owner) external {
      owners.push(owner);
      ownersAllocations[owner] = 0;
    }

    // -----------------------------------------------
    // NOTE: see IHooks.sol for function documentation
    // -----------------------------------------------
    function afterSwap(address, PoolKey calldata, IPoolManager.SwapParams calldata, BalanceDelta swapDelta, bytes calldata)
        external
        override
        returns (bytes4, int128)
    {
      require(owners.length > 0, "No owners");
       
      int256 everyOwnerGets = int256(swapDelta.amount0()) / int256(owners.length);
      
      for (uint256 i = 0; i < owners.length; i++) {
        ownersAllocations[owners[i]] += uint256(everyOwnerGets);
      }

      return (BaseHook.afterSwap.selector, 0);
    }
}
