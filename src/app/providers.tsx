"use client";

import { Provider as ReduxProvider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/redux/store";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
}
