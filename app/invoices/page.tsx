import React from "react";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getInvoices } from "@/actions/invoices/getInvoice";
export default async function page() {
    // TODO : Add invoice components and fetch specific invoices for users
    // for the time being only add some dummy invoices to the database/
    // this will invlove the concept of seeding the database so we will do that
    const session = await auth();

    const invoices = await getInvoices();

    return (
        <div className=" max-w-sm overflow-x-hidden m-auto">
            {" "}
            Invoices {JSON.stringify(invoices)}
        </div>
    );
}
