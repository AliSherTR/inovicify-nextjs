"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function SideBar() {
    const { setTheme, theme } = useTheme();
    function changeTheme(theme: string | undefined) {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    return (
        <aside className=" flex xl:flex-col items-center justify-between  h-full bg-[#252945] xl:w-[65%] rounded-r-3xl">
            <div className=" xl:w-full w-[10%] h-[7rem]  flex items-center ">
                <div className=" group relative bg-[#7c5dfa] h-full w-full rounded-r-3xl flex items-center justify-center overflow-hidden cursor-pointer ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="26"
                        className=" relative z-50"
                    >
                        <path
                            fill="#FFF"
                            fill-rule="evenodd"
                            d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
                        ></path>
                    </svg>

                    <div className=" absolute inset-0 top-14 z-10 bg-[#9277ff]/90 rounded-tl-2xl group-hover:top-3 transition-all ease-linear duration-300 "></div>
                </div>
            </div>
            <div className="p-6 self-end w-full flex items-center justify-center">
                <button
                    className=" text-white"
                    onClick={() => changeTheme(theme)}
                >
                    {theme === "light" ? <Moon /> : <Sun />}
                </button>
            </div>
        </aside>
    );
}
