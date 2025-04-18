import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "./customFetch";
import { Post, Comment, User } from "@/types/dummy";
// 쿼리 키
export const queryKeys = {
  posts: {
    all: ["posts"] as const,
    lists: () => [...queryKeys.posts.all, "list"] as const,
    list: (filters?: string) => [...queryKeys.posts.lists(), { filters }] as const,
    details: () => [...queryKeys.posts.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.posts.details(), id] as const,
  },
  comments: {
    all: ["comments"] as const,
    lists: () => [...queryKeys.comments.all, "list"] as const,
    list: (postId: number) => [...queryKeys.comments.lists(), postId] as const,
  },
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.users.details(), id] as const,
  },
} as const;

// Posts 관련 훅
export const usePosts = (filters?: string) => {
  return useQuery<Post[]>({
    queryKey: queryKeys.posts.list(filters || ""),
    queryFn: () => customFetch<never, Post[]>("/posts"),
  });
};

export const usePost = (id: number) => {
  return useQuery<Post>({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => customFetch<never, Post>(`/posts/${id}`),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: Omit<Post, "id">) =>
      customFetch<Omit<Post, "id">, Post>("/posts", {
        method: "POST",
        data: newPost,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
  });
};

// Comments 관련 훅
export const useComments = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: queryKeys.comments.list(postId),
    queryFn: () => customFetch<never, Comment[]>(`/posts/${postId}/comments`),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: Omit<Comment, "id">) =>
      customFetch<Omit<Comment, "id">, Comment>("/comments", {
        method: "POST",
        data: newComment,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.list(variables.postId),
      });
    },
  });
};

// Users 관련 훅
export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: queryKeys.users.lists(),
    queryFn: () => customFetch<never, User[]>("/users"),
  });
};

export const useUser = (id: number) => {
  return useQuery<User>({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => customFetch<never, User>(`/users/${id}`),
  });
};
