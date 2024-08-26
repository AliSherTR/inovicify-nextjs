import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MainHeaderProps {
    username: string;
    imageUrl?: string;
}

export default function MainHeader({ username, imageUrl }: MainHeaderProps) {
    return (
        <div className=" flex h-full items-center justify-between px-6 w-full dark:shadow-white dark:bg-transparent shadow-lg ">
            <p>Welcom Back! {username} </p>

            <Avatar>
                <AvatarImage
                    src={
                        imageUrl?.length
                            ? imageUrl
                            : "https://github.com/shadcn.png"
                    }
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    );
}
