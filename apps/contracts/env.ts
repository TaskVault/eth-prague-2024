import { parseEnv } from "znv";
import { z } from "zod";
import "dotenv/config";

export const ENV = parseEnv(process.env, {
  MUMBAI_URL: z.string().optional(),
  MAINET_URL: z.string().optional(),
  DEPLOYER_MNEMONIC: z.string().optional(),
  OPERATOR_MNEMONIC: z.string().optional(),
  FEE_MNEMONIC: z.string().optional(),
});
