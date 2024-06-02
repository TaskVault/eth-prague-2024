import {useContractWrite, useWaitForTransactionReceipt} from "wagmi";
import {ERC_20_ABI, TOKEN_SUBMISSION_ABI} from "@/lib/eth/abi";
import {useMutation} from "@tanstack/react-query";
import {waitForTransactionReceipt} from "viem/actions";


export const WETH_ADDR = "0x5fbdb2315678afecb367f032d93f642f64180aa3" // TODO
export const TOKEN_SUBMISSION_ADDR = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512" // TODO

export const MANAGER_ADDR = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0" // TODO
export const POOL_MODIFY_LIQ_TEST_ADDR = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9" // TODO
export const POOL_SWAP_TEST_ADDR = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707" // TODO


export const useTokenSubmission = () => {
    const write = useContractWrite()

    const contributeAndVote =  useMutation({
        mutationFn: async () => {
            const approval = await write.writeContractAsync({
                abi: ERC_20_ABI,
                address: WETH_ADDR,
                functionName: "approve",
                args: [TOKEN_SUBMISSION_ADDR, BigInt("5000000000000000001")],
            })

            const contributeAndVote = await write.writeContractAsync({
                abi: TOKEN_SUBMISSION_ABI,
                address: TOKEN_SUBMISSION_ADDR,
                functionName: "contributeAndVote",
                args: [BigInt(0), BigInt("5000000000000000001")],
            })

            return {approval, contributeAndVote}
        }
    })

    const submitToken = useMutation({
        mutationFn: async (props: {
            name: string,
            description: string
        }) => {
            const submitToken = await write.writeContractAsync({
                abi: TOKEN_SUBMISSION_ABI,
                address: TOKEN_SUBMISSION_ADDR,
                functionName: "submitTokenIdea",
                args: [props.name, props.description],
            })

            return {submitToken}
        }
    })

    const createTokenAndAddLiquidity = useMutation({
        mutationFn: async () => {
            const approval = await write.writeContractAsync({
                abi: ERC_20_ABI,
                address: WETH_ADDR,
                functionName: "approve",
                args: [POOL_MODIFY_LIQ_TEST_ADDR, BigInt("5000000000000000001")],
            })
            const createTokenAndAddLiquidity = await write.writeContractAsync({
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
        createTokenAndAddLiquidity,
        submitToken
    }
}
