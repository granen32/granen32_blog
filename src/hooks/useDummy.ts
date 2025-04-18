import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constant/queryKey";
import { customFetch } from "@/lib/api/customFetch";
import { Post, Comment, User } from "@/types/dummy";

export const queryKeys = {
  post: QUERY_KEYS.GENERAL.PLANS.INDEX,
  comment: QUERY_KEYS.GENERAL.PLANS.INDEX,
  user: QUERY_KEYS.GENERAL.PLANS.INDEX,
};

// 유틸리티 훅
export const useQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5분
      },
    },
  });
};

// Post 관련 훅
export const usePostList = (options?: UseQueryOptions<Post[]>) => {
  return useQuery({
    queryKey: QUERY_KEYS.POST.LIST,
    queryFn: () => customFetch<never, Post[]>(`/posts`),
    ...options,
  });
};

export const usePostDetail = (id: number, options?: UseQueryOptions<Post>) => {
  return useQuery({
    queryKey: QUERY_KEYS.POST.DETAIL(id),
    queryFn: () => customFetch<never, Post>(`/posts/${id}`),
    ...options,
  });
};

export const useCreatePost = (options?: UseMutationOptions<Post, Error, Partial<Post>>) => {
  return useMutation({
    mutationKey: QUERY_KEYS.POST.CREATE,
    mutationFn: (data: Partial<Post>) =>
      customFetch<Partial<Post>, Post>(`/posts`, {
        method: "POST",
        data: data,
      }),
    ...options,
  });
};

// Comment 관련 훅
export const useCommentList = (postId: number, options?: UseQueryOptions<Comment[]>) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMENT.LIST(postId),
    queryFn: () => customFetch<never, Comment[]>(`/posts/${postId}/comments`),
    ...options,
  });
};

export const useCreateComment = (
  options?: UseMutationOptions<Comment, Error, { postId: number; content: string }>
) => {
  return useMutation({
    mutationKey: QUERY_KEYS.COMMENT.CREATE,
    mutationFn: ({ postId, content }) =>
      customFetch<{ content: string }, Comment>(`/posts/${postId}/comments`, {
        method: "POST",
        data: { content },
      }),
    ...options,
  });
};

// User 관련 훅
export const useUserProfile = (options?: UseQueryOptions<User>) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER.PROFILE,
    queryFn: () => customFetch<never, User>(`/users/profile`),
    ...options,
  });
};

// 게시글 업데이트 훅
export const useUpdatePost = (
  options?: UseMutationOptions<Post, Error, { id: number; data: Partial<Post> }>
) => {
  return useMutation({
    mutationKey: QUERY_KEYS.POST.UPDATE,
    mutationFn: ({ id, data }) =>
      customFetch<Partial<Post>, Post>(`/posts/${id}`, {
        method: "PATCH",
        data,
      }),
    ...options,
  });
};

// 게시글 삭제 훅
export const useDeletePost = (options?: UseMutationOptions<void, Error, number>) => {
  return useMutation({
    mutationKey: QUERY_KEYS.POST.DELETE,
    mutationFn: (id) =>
      customFetch<never, void>(`/posts/${id}`, {
        method: "DELETE",
      }),
    ...options,
  });
};

// 댓글 업데이트 훅
export const useUpdateComment = (
  options?: UseMutationOptions<Comment, Error, { id: number; content: string }>
) => {
  return useMutation({
    mutationKey: QUERY_KEYS.COMMENT.UPDATE,
    mutationFn: ({ id, content }) =>
      customFetch<{ content: string }, Comment>(`/comments/${id}`, {
        method: "PATCH",
        data: { content },
      }),
    ...options,
  });
};

// 댓글 삭제 훅
export const useDeleteComment = (options?: UseMutationOptions<void, Error, number>) => {
  return useMutation({
    mutationKey: QUERY_KEYS.COMMENT.DELETE,
    mutationFn: (id) =>
      customFetch<never, void>(`/comments/${id}`, {
        method: "DELETE",
      }),
    ...options,
  });
};
