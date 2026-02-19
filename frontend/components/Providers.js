"use client";
import { SessionProvider } from "next-auth/react";
import { SnishopProvider } from "../context/SnishopContext";

export function Providers({ children }) {
    return (
        <SessionProvider>
            <SnishopProvider>
                {children}
            </SnishopProvider>
        </SessionProvider>
    );
}
