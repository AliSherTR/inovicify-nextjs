"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { BackButton } from "./back-button";
import { Social } from "./social";

interface CardWrapperProps {
    children: React.ReactNode;
    backButtonLabel: string;
    backButtonHref: string;
    subHeading: string;
    showSocial?: boolean;
}

export function CardWrapper({
    children,
    backButtonLabel,
    backButtonHref,
    showSocial,
    subHeading,
}: CardWrapperProps) {
    return (
        <Card className=" w-[500px] shadow-md">
            <BackButton label="Go Back" href="/" />
            <CardHeader>
                <div className=" w-full flex flex-col gap-y-4 items-center justify-center">
                    <h1 className={"text-3xl font-semibold"}>Invoicify</h1>
                    <p className=" text-muted-foreground text-sm">
                        {subHeading}
                    </p>
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>

            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel} />
            </CardFooter>
        </Card>
    );
}
