"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

export function Social() {
    return (
        <div className=" flex items-center w-full gap-x-2">
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
                onClick={() => signIn("github")}
            >
                <FaGithub className=" h-5 w-5" />
            </Button>
        </div>
    );
}
