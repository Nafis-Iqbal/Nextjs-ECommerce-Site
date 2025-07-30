/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode} from "react";
import { Provider } from "react-redux";
import store from "@/global-state-context/globalStateStore";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from "@/services/apiInstance";

export function ClientProviders({ children, session }: { children: ReactNode, session: any; }) {
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Provider store={store}>
          <ReactQueryDevtools initialIsOpen={true}/>
          {children}
        </Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
