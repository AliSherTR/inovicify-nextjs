import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import SideBar from "@/components/side-bar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
            <body className={`${fontSans.className} overflow-y-auto`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <main className=" min-h-screen h-screen grid grid-cols-16 grid-rows-12 overflow-y-hidden ">
                        <aside className=" xl:col-start-1 xl:col-end-2 row-end-2 col-span-full row-span-full h-screen  xl:row-start-1 xl:row-span-full dark:bg-[#141625]">
                            <SideBar />
                        </aside>

                        {/* main  */}
                        <main className="xl:col-start-2 h-screen col-span-full dark:bg-[#141625] transition-colors ease-in-out duration-150  overflow-y-auto  flex items-center justify-center">
                            {children}
                        </main>
                    </main>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
