# Degens For Future

### **A template for writing Uniswap v4 Hooks 🦄**

[`Based on Uniswap V4-template`](https://github.com/uniswapfoundation/v4-template/generate)

1. The Token Submission Contract [TokenSubmission.sol](src/TokenSubmission.sol) describes the flows for creation, voting and liquidity handle for the Meme Tokens.
2. The Creator Community Contract [CreatorCommunity.sol](src/CreatorCommunity.sol) demonstrates the `afterSwap()` hooks used as the trigger for fund distribution over Meme Tokens creators.
3. The test for Token Submission [TokenSubmission.sol](test/TokenSubmission.t.sol) helps us to see a flow of application and voting for the Meme Tokens.

---

## Set up

_requires [foundry](https://book.getfoundry.sh)_

```
forge install
forge test
```

### Local Development (Anvil)

Other than writing unit tests (recommended!), you can only deploy & test hooks on [anvil](https://book.getfoundry.sh/anvil/)

```bash
# start anvil, a local EVM chain
anvil
```

### _Deploying your Contracts Testing_

```bash
# in a new terminal
forge script script/wETH.s.sol:OwnETH \
    --rpc-url http://localhost:8545 \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
    --broadcast
```

Take the wETH and update the Token Submission contract with the new Token address.

```bash
# in a new terminal
forge script script/TokenSubmission.s.sol:TokenSubmissionScript \
    --rpc-url http://localhost:8545 \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
    --broadcast
```

</details>

---
