import {useMutation, useQuery} from "@tanstack/react-query";
import {apiClient} from "@/apiClient";

export const useUserCreate = () => {
    return useMutation({
        mutationFn: async (wallet: string) => {
            const result = await apiClient["/users"].post({
                json: {wallet: wallet.toLowerCase()}
            })
        },
    })
}

export const useGetUser = (props: {
    wallet?: string
}) => {
    const createUser = useUserCreate();
    return useQuery({
        enabled: !!props.wallet,
        queryKey: ["user"],
        queryFn: async () => {
            if (!props.wallet)
                return null
            const result = await apiClient["/users/{wallet}"].get({
                params: {wallet: props.wallet.toLowerCase()}
            })
            let resultParsed
            try {
                resultParsed = await result.json()
            } catch (e) {
                console.log("error", e)
            }
            if (!resultParsed) {
                    console.log("User not found, creating user")
                    await createUser.mutateAsync(props.wallet)
            }
            return result.json()
        },
    })
}
