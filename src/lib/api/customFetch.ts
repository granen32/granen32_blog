import { axiosInstance } from "./axiosInstance";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
};

interface FetchOptions<T> {
  method?: HttpMethod;
  data?: T;
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
}

export const customFetch = async <T, R>(url: string, options: FetchOptions<T> = {}): Promise<R> => {
  const { method = "GET", data, params, headers } = options;

  try {
    const response = await axiosInstance.request<ApiResponse<R>>({
      method,
      url,
      data,
      params,
      headers,
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
