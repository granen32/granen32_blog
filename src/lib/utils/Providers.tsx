"use client";

import React, { ReactNode } from "react";
import { ModalProvider, TabProvider } from "../contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { NextAuthProvider } from "./NextAuthProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <TabProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </TabProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}
