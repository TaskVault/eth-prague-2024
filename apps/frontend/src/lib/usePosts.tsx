import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/apiClient";
import { useAccount } from "wagmi";

export const usePosts = () => {
  const account = useAccount();
  const createPost = useMutation({
    mutationFn: async (variables: {
      description: string;
      title: string;
      image: string;
      userId: string;
    }) => {
      const res = apiClient["/posts/{userId}"].post({
        // create random uuid ( ?? )
        params: { userId: variables.userId },
        json: {
          description: variables.description,
          title: variables.title,
          image: variables.image,
        },
      });
      return res.json();
    },
  });

  const likePost = useMutation({
    mutationFn: async (variables: { postId: string; userId: string }) => {
      const res = apiClient["/posts/{postId}/reactions/{userId}"].put({
        params: { postId: variables.postId, userId: variables.userId },
        json: {
          reaction: "like",
        },
      });
      return res.json();
    },
  });

  const dislikePost = useMutation({
    mutationFn: async (variables: { postId: string; userId: string }) => {
      const res = apiClient["/posts/{postId}/reactions/{userId}"].put({
        params: { postId: variables.postId, userId: variables.userId },
        json: {
          reaction: "dislike",
        },
      });
      return res.json();
    },
  });

  const commentPost = useMutation({
    mutationFn: async (variables: { postId: string; userId: string; comment: string }) => {
      const res = apiClient[`/posts/{postId}/comments/{userId}`].post({
        params: { postId: variables.postId, userId: variables.userId },
        json: {
          text: variables.comment,
        },
      });
      return res.json();
    },
  });

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
  };
};
