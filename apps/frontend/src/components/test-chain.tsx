import {TOKEN_SUBMISSION_ADDR, useTokenSubmission} from "@/lib/eth/useTokenSubmission";
import {Button} from "@/components/ui/button";
import {useReadContract} from "wagmi";
import { TOKEN_SUBMISSION_ABI } from "@/lib/eth/abi";

export const TestChain = () => {
    const {createTokenAndAddLiquidity, contributeAndVote, submitToken} = useTokenSubmission();

    const submissions = useReadContract({
        address: TOKEN_SUBMISSION_ADDR,
        abi: TOKEN_SUBMISSION_ABI,
        functionName: "tokenIdeas",
    })

    console.log("Submissions", submissions.data);

    const handleClick = async () => {
        // submit token
        // const result = await submitToken.mutateAsync();
        // console.log("Submitted token", result);

        // contribute and vote
        const result2 = await contributeAndVote.mutateAsync();

        console.log("Contribute and vote", result2);

        const result3 = await createTokenAndAddLiquidity.mutateAsync();
        console.log("Create token and add liquidity", result3);

    }
    return <div><Button onClick={handleClick}>
        Create Token And Add Liquidity
    </Button></div>;
}
