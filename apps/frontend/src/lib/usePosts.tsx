import {useMutation, useQuery} from "@tanstack/react-query";
import {apiClient} from "@/apiClient";
import {useAccount} from "wagmi";

export const usePosts = () => {
    const account = useAccount()
    const createPost = useMutation({
        mutationFn: async (variables: {
            description: string;
            title: string;
            image: string;
        }) => {
            const res = apiClient["/posts/{userId}"].post({
                params: {userId: "1"},
                json: {
                    description: variables.description,
                    title: variables.title,
                    image: variables.image,
                }
            });
            return res.json();
        },
    });

    const posts = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = apiClient["/posts"].get()
            return res.json();
        },
    });


    return {
        createPost,
        posts,
    }
}
