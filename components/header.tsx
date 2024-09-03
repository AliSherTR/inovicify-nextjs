import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function MainHeader() {
    const session = await auth();
    return (
        <div className=" flex h-full items-center justify-between px-6 w-full transition-all ease-in-out duration-300  dark:bg-transparent shadow-lg ">
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
                    <>
                        <form
                            action={async () => {
                                "use server";

                                await signOut({
                                    redirectTo: "/",
                                });
                            }}
                        >
                            <Button variant={"secondary"} type="submit">
                                Sign Out
                            </Button>
                        </form>
                    </>
                ) : (
                    <Link href={"/auth/login"}>Login</Link>
                )}
            </div>
        </div>
    );
}
