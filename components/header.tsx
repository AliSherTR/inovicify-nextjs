import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function MainHeader() {
    const session = await auth();
    return (
        <div className=" flex h-full items-center justify-between px-6 w-full dark:shadow-white dark:bg-transparent shadow-lg ">
            <p>
                {" "}
                {session?.user?.name
                    ? `Welcom Back! ${session.user.name}`
                    : "Please login"}{" "}
            </p>

            <div className=" flex items-center gap-x-6">
                {session?.user?.image?.length ? (
                    <Avatar>
                        <AvatarImage src={session.user.image} />
                    </Avatar>
                ) : (
                    <Avatar>
                        <AvatarFallback>
                            {session?.user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                )}

                {session?.user?.email ? (
                    <Button variant={"secondary"}>
                        <form
                            action={async () => {
                                "use server";

                                await signOut();
                            }}
                        >
                            <button type="submit">Sign Out</button>
                        </form>
                    </Button>
                ) : (
                    <Link href={"/auth/login"}>Login</Link>
                )}
            </div>
        </div>
    );
}
