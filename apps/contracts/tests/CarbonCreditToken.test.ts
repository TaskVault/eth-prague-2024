import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import hre from "hardhat";

import { expect } from "chai";
import CCRToken from "../ignition/modules/CarbonCreditTokenModule";
import { mnemonicToAccount } from "viem/accounts";

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1, addr2;
  const INITIAL_SUPPLY = ethers.utils.parseEther("1000000");

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call MyToken.deploy() and await it.
    myToken = await MyToken.deploy(INITIAL_SUPPLY);
    await myToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should mint the total supply to the owner", async function () {
      expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });
  });

  describe("Transactions", function () {
    it("Should transfer the tokens correctly", async function () {
      // Transfer 50 tokens to addr1
      const transferAmount = ethers.utils.parseEther("50");
      await myToken.transfer(addr1.address, transferAmount);

      // Check that the owner no longer owns all the tokens
      expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY.sub(transferAmount));

      // Check that addr1 now owns the transferred amount
      expect(await myToken.balanceOf(addr1.address)).to.equal(transferAmount);
    });

    it("Should fail to transfer a larger amount than balance", async function () {
      const userBalance = await myToken.balanceOf(addr1.address);
      await expect(
        myToken.connect(addr1).transfer(owner.address, userBalance.add(1))
      ).to.be.revertedWith("Transfer amount exceeds balance");
    });
  });
});
