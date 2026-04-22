import React from "react";
import { Navbar } from "./navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}
