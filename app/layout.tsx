import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import MainHeader from "@/components/header";
import SideBar from "@/components/side-bar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={fontSans.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <main className=" min-h-screen grid grid-cols-16 grid-rows-12">
                        <aside className=" xl:col-start-1 xl:col-end-2 row-end-2 col-span-full h-full xl:row-start-1 xl:row-span-full dark:bg-[#141625]">
                            <SideBar />
                        </aside>
                        {/* header */}
                        <header className=" xl:col-start-2 xl:col-span-full xl:row-start-1 xl:row-end-2 col-span-full row-start-2 row-end-3 ">
                            <MainHeader username="Ali Sher Khan" />
                        </header>

                        {/* main  */}
                        <main className=" row-span-full xl:row-start-2 row-start-3 xl:col-start-2 col-span-full dark:bg-[#141625]  flex items-center justify-center">
                            {children}
                        </main>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
