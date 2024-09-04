"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SideBar() {
    const { setTheme, theme } = useTheme();

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return;
    return (
        <div className=" flex xl:flex-col items-center justify-between  h-full bg-[#252945]  rounded-r-3xl">
            <div className=" xl:w-full w-[10%] h-[7rem]  flex items-center ">
                <div className=" group relative bg-[#7c5dfa] h-full w-full rounded-r-3xl flex items-center justify-center overflow-hidden cursor-pointer ">
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={28}
                        height={26}
                        className=" z-50"
                    />

                    <div className=" absolute inset-0 top-14 z-10 bg-[#9277ff]/90 rounded-tl-2xl group-hover:top-3 transition-all ease-linear duration-300 "></div>
                </div>
            </div>
            <div
                className="p-6 xl:self-end self-center xl:w-full flex items-center xl:justify-center justify-end"
                suppressHydrationWarning
            >
                {theme === "light" && (
                    <button
                        className=" text-white"
                        onClick={() => setTheme("dark")}
                        suppressHydrationWarning
                    >
                        <Moon />
                    </button>
                )}
                {theme === "dark" && (
                    <button
                        className=" text-white"
                        onClick={() => setTheme("light")}
                        suppressHydrationWarning
                    >
                        <Sun />
                    </button>
                )}
            </div>
        </div>
    );
}
