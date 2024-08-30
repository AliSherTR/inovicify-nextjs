"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="dark:bg-[#1e2139] p-10 max-w-md text-center rounded-md">
            <h1 className=" font-bold dark:text-white  text-3xl mb-6">Login</h1>
            <p className=" font-normal dark:text-white tracking-wider leading-6 mb-6">
                This is a portfolio project developed from{" "}
                <Link className=" text-blue-400 underline" href="#">
                    Frontend Mentor
                </Link>{" "}
                with some enhancements. Devloped and maintained by
                <Link className=" text-blue-400 underline" href="#">
                    {" "}
                    Ali Sher Khan
                </Link>
            </p>
            <div className=" space-x-4">
                <Button
                    variant={"link"}
                    className=" dark:text-white text-black"
                    asChild
                >
                    <Link href="/auth/login">Sign in with email</Link>
                </Button>
                <Button
                    variant={"link"}
                    onClick={() => signIn("github")}
                    className=" dark:text-white text-black"
                >
                    Sign in with Github
                </Button>
            </div>
        </div>
    );
}
