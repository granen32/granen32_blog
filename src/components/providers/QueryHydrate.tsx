"use client";

import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";

interface QueryHydrateProps {
  children: React.ReactNode;
  state: DehydratedState;
}

export default function QueryHydrate({ children, state }: QueryHydrateProps) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
