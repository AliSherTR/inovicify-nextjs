"use server";

import { signIn } from "@/auth";

export const loginWithGithub = async () => {
    try {
        await signIn("github");
    } catch (error) {
        console.log("THIS ERROR OCCURED IN SERVER");
    }
};
