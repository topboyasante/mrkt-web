"use client"
import { SessionProvider } from "next-auth/react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SessionProvider>
    </>
  );
}
