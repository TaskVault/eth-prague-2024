import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import hre from "hardhat";

import { expect } from "chai";
import MemeCCRTokenModule from "../ignition/modules/MemeCCRTTokenModule";
import { mnemonicToAccount } from "viem/accounts";
import { formatEther, formatUnits } from "viem";

describe("Tests for MemeCCR Token", function () {

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTransfersFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const {
      MemeCCRToken,
    } = await hre.ignition.deploy(MemeCCRTokenModule);

    console.log("Deployed MemeCCRTokenModule at", MemeCCRToken);

    return { MemeCCRToken, owner };
  }

  describe("Deployment", function () {
    it("Correctly deploy", async function () {
      const { MemeCCRToken, owner } = await loadFixture(
        deployTransfersFixture,
      );

      console.log("MemeCCRToken", MemeCCRToken.address);

      const balance = await MemeCCRToken.read.balanceOf([owner.account.address]);
      expect(await MemeCCRToken.read.name()).to.equal("MemeCCRToken");
      expect(await MemeCCRToken.read.symbol()).to.equal("MCCR");
      expect(formatUnits(balance, 0)).to.equal("1000000000");
    });
  });

  // describe("Deployment", function () {
  //   it("Should set the right owner", async function () {
  //     expect(await myToken.owner()).to.equal(owner.address);
  //   });

  //   it("Should mint the total supply to the owner", async function () {
  //     expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
  //   });
  // });

  // describe("Transactions", function () {
  //   it("Should transfer the tokens correctly", async function () {
  //     // Transfer 50 tokens to addr1
  //     const transferAmount = ethers.utils.parseEther("50");
  //     await myToken.transfer(addr1.address, transferAmount);

  //     // Check that the owner no longer owns all the tokens
  //     expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY.sub(transferAmount));

  //     // Check that addr1 now owns the transferred amount
  //     expect(await myToken.balanceOf(addr1.address)).to.equal(transferAmount);
  //   });

  //   it("Should fail to transfer a larger amount than balance", async function () {
  //     const userBalance = await myToken.balanceOf(addr1.address);
  //     await expect(
  //       myToken.connect(addr1).transfer(owner.address, userBalance.add(1))
  //     ).to.be.revertedWith("Transfer amount exceeds balance");
  //   });
  // });
});
