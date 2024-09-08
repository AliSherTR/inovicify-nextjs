"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { getSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

type User = {
    name: string;
    email: string;
    image: string;
    userId: string;
};

type sessionObject = {
    user: User;
    expires: string;
};

export default function SideBar() {
    const { setTheme, theme } = useTheme();

    const [session, setSession] = useState<sessionObject | undefined>();

    useEffect(() => {
        async function fetchSession() {
            const sessionData = getSession().then((data) => setSession(data));
        }
        fetchSession();
    }, []);

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        if (!isClient) {
            setIsClient(true);
        }
    }, [isClient]);

    if (!isClient) return;
    return (
        <div className=" flex xl:flex-col items-center justify-between  h-full bg-[#252945] pb-5  rounded-r-3xl">
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
            <div className="p-6 xl:self-end flex-1 xl:w-full flex  xl:justify-center items-end justify-end">
                {theme === "light" && (
                    <button
                        className=" text-white"
                        onClick={() => setTheme("dark")}
                    >
                        <Moon />
                    </button>
                )}
                {theme === "dark" && (
                    <button
                        className=" text-white"
                        onClick={() => setTheme("light")}
                    >
                        <Sun />
                    </button>
                )}
            </div>

            {session?.user?.image?.length && (
                <div className=" border-t w-full flex items-center justify-center pt-3 ">
                    <Avatar>
                        <AvatarImage
                            src={session.user.image}
                            onClick={() => signOut()}
                        />
                    </Avatar>
                </div>
            )}
        </div>
    );
}
