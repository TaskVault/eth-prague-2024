import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const INIT_SUPPLY = parseEther("1_000_000_000");

const CarbonCreditTokenModule = buildModule("CarbonCreditTokenModule", (m) => {

  const CCRToken = m.contract("CarbonCreditToken", [INIT_SUPPLY]);

  return { CCRToken };
});

export default CarbonCreditTokenModule;
