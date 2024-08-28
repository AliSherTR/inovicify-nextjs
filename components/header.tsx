import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        </div>
    );
}
