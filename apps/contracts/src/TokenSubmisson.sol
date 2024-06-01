// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {MemeCCRToken} from "./Tokens/MemeCCRToken.sol";

contract TokenSubmission {
    struct TokenIdea {
        string name;
        string symbol;
        uint256 votes;
    }

    address public owner;
    uint256 public targetAmount;
    uint256 public totalCollected;
    TokenIdea[] public tokenIdeas;
    mapping(address => bool) public hasSubmitted;

    IPoolManager public uniPoolManager;
    address public WETH;

    constructor(uint256 _targetAmount, address _uniPoolManager, address _WETH) {
        owner = msg.sender;
        targetAmount = _targetAmount;
        uniPoolManager = IPoolManager(_uniPoolManager);
        WETH = _WETH;
    }

    function submitTokenIdea(string calldata _name, string calldata _symbol) external {
        require(!hasSubmitted[msg.sender], "Already submitted");
        tokenIdeas.push(TokenIdea({name: _name, symbol: _symbol, votes: 0}));
        hasSubmitted[msg.sender] = true;
    }

    function contributeAndVote(uint256 _ideaIndex) external payable {
        require(_ideaIndex < tokenIdeas.length, "Invalid index");
        require(msg.value > 0, "Must contribute Ether");

        totalCollected += msg.value;
        tokenIdeas[_ideaIndex].votes += msg.value;
    }

    function createTokenAndAddLiquidity() external {
        require(totalCollected >= targetAmount, "Target not met");

        TokenIdea memory winningIdea = getWinningIdea();

        uint256 liquidityAmount = totalCollected / 2;
        uint256 tokenAmount = liquidityAmount * 1000; // Example ratio

        MemeCCRToken newToken = new MemeCCRToken(winningIdea.name, winningIdea.symbol, tokenAmount);

        newToken.approve(address(uniPoolManager), tokenAmount);
        // TODO create pool with univ4 and add liquidity

        payable(owner).transfer(address(this).balance);
    }

    function getWinningIdea() internal view returns (TokenIdea memory) {
        TokenIdea memory winningIdea;
        uint256 maxVotes = 0;

        for (uint256 i = 0; i < tokenIdeas.length; i++) {
            if (tokenIdeas[i].votes > maxVotes) {
                winningIdea = tokenIdeas[i];
                maxVotes = tokenIdeas[i].votes;
            }
        }

        return winningIdea;
    }
}
