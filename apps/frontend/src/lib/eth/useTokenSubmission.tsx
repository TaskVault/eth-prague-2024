import {useContractWrite} from "wagmi";
import {ERC_20_ABI, TOKEN_SUBMISSION_ABI} from "@/lib/eth/abi";
import {useMutation} from "@tanstack/react-query";


const WETH_ADDR = "0x1234567890123456789012345678901234567890" // TODO
const MANAGER_ADDR = "0x1234567890123456789012345678901234567890" // TODO
const POOL_MODIFY_LIQ_TEST_ADDR = "0x1234567890123456789012345678901234567890" // TODO
const POOL_SWAP_TEST_ADDR = "0x1234567890123456789012345678901234567890" // TODO
const TOKEN_SUBMISSION_ADDR = "0x1234567890123456789012345678901234567890" // TODO

export const useTokenSubmission = () => {
    const write = useContractWrite()

    const contributeAndVote =  useMutation({
        mutationFn: async () => {
            const approval = await write.writeContractAsync({
                abi: ERC_20_ABI,
                address: WETH_ADDR,
                functionName: "approve",
                args: [TOKEN_SUBMISSION_ADDR, BigInt("5000000000000000000")],
            })
            const contributeAndVote = await write.writeContract({
                abi: TOKEN_SUBMISSION_ABI,
                address: TOKEN_SUBMISSION_ADDR,
                functionName: "contributeAndVote",
                args: [BigInt(0), BigInt("5000000000000000000")],
            })

            return {approval, contributeAndVote}
        }
    })

    const createTokenAndAddLiquidity = useMutation({
        mutationFn: async () => {
            const approval = await write.writeContractAsync({
                abi: ERC_20_ABI,
                address: WETH_ADDR,
                functionName: "approve",
                args: [POOL_MODIFY_LIQ_TEST_ADDR, BigInt("5000000000000000000")],
            })
            const createTokenAndAddLiquidity = await write.writeContract({
                abi: TOKEN_SUBMISSION_ABI,
                address: TOKEN_SUBMISSION_ADDR,
                functionName: "createTokenAndAddLiquidity",
                args: [MANAGER_ADDR, POOL_MODIFY_LIQ_TEST_ADDR, POOL_SWAP_TEST_ADDR],
            })

            return {approval, createTokenAndAddLiquidity}
        }
    })

    return {
        contributeAndVote,
        createTokenAndAddLiquidity
    }
}
