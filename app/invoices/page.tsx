import React from "react";
import { auth } from "@/auth";
export default async function page() {
    const session = await auth();
    console.log(session);
    return <div>{session?.user?.name} Invoices</div>;
}
