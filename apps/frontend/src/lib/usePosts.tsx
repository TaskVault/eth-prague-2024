import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/apiClient";
import { useAccount } from "wagmi";
import {useTokenSubmission} from "@/lib/eth/useTokenSubmission";

export const usePosts = () => {
  const account = useAccount();
  const {createTokenAndAddLiquidity, contributeAndVote, submitToken} = useTokenSubmission();
  const createPost = useMutation({
    mutationFn: async (variables: {
      description: string;
      title: string;
      image: string;
    }) => {
      if (!account.address) {
        throw new Error("Account not found");
      }
      const res = apiClient["/posts/{wallet}"].post({
        params: { wallet: account.address },
        json: {
          description: variables.description,
          title: variables.title,
          image: variables.image,
        },
      });
      await submitToken.mutateAsync({
        description: variables.description,
        name: variables.title,
      })
      return res.json();
    },
  });

  const likePost = useMutation({
    mutationFn: async (variables: { postId: string }) => {
      if (!account.address) {
        throw new Error("Account not found");
      }
      const res = apiClient["/posts/{postId}/reactions/{wallet}"].put({
        params: { postId: variables.postId, wallet: account.address },
        json: {
          reaction: "like",
        },
      });
      return res.json();
    },
  });

  const dislikePost = useMutation({
    mutationFn: async (variables: { postId: string}) => {
      if (!account.address) {
        throw new Error("Account not found");
      }
      const res = apiClient["/posts/{postId}/reactions/{wallet}"].put({
        params: { postId: variables.postId, wallet: account.address },
        json: {
          reaction: "dislike",
        },
      });
      return res.json();
    },
  });

  const commentPost = useMutation({
    mutationFn: async (variables: {
      postId: string;
      userId: string;
      comment: string;
    }) => {
      const res = apiClient[`/posts/{postId}/comments/{userId}`].post({
        params: { postId: variables.postId, userId: variables.userId },
        json: {
          text: variables.comment,
        },
      });
      return res.json();
    },
  });

  const createUser = useMutation({
    mutationFn: async (variables: { wallet: string }) => {
      const res = apiClient["/users"].post({
        json: {
          wallet: variables.wallet,
        },
      });
      return res.json();
    },
  });

  /*const getUsers = useMutation({
    mutationFn: async (variables: {wallet: string}) => {
      const res = apiClient["/users/{wallet}"].get({
        params: { wallet: variables.wallet },
      });}
      );

    },
  });*/
  const getUsers = useMutation ({
    mutationFn: async (variables: {wallet: string}) => {
        const res = apiClient["/users/{wallet}"].get({
            params: { wallet: variables.wallet },
        });
        return res.json();
    }
  })

  const posts = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = apiClient["/posts"].get();
      return res.json();
    },
  });

  return {
    createPost,
    posts,
    likePost,
    dislikePost,
    commentPost,
    createUser,
    getUsers,
  };
};
