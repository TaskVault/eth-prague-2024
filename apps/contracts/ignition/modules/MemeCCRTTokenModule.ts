import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const INIT_SUPPLY = 1_000_000_000;

const MemeCCRTokenModule = buildModule("MemeCCRTokenModule", (m) => {

  const MemeCCRToken = m.contract("MemeCCRToken", [INIT_SUPPLY]);

  return { MemeCCRToken };
});

export default MemeCCRTokenModule;
