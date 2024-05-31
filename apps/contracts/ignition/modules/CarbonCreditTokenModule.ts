import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const INIT_SUPPLY = 1_000_000_000;

const CarbonCreditTokenModule = buildModule("CarbonCreditTokenModule", (m) => {

  const CCRToken = m.contract("CarbonCreditToken", [INIT_SUPPLY]);

  return { CCRToken };
});

export default CarbonCreditTokenModule;
