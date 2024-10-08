import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import rightArrow from "@/public/icon-arrow-right.svg";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Items {
    quantity: number;
    price: number;
}

interface InvoiceProps {
    id: string;
    dueDate: string;
    clientName: string;
    items?: Items[];
    status: string;
}

export default function Invoice({
    id,
    dueDate,
    clientName,
    items,
    status,
}: InvoiceProps) {
    const statusButton = status?.toLowerCase() || undefined;

    const totalAmount = items?.reduce((acc, item) => {
        const quantity = item?.quantity || 0;
        const price = item?.price || 0;

        return acc + quantity * price;
    }, 0);
    return (
        <Link href={`/invoices/${id}`}>
            <div className=" flex items-center justify-between gap-4 py-7 rounded-[10px]  px-4 cursor-pointer hover:border-purple-800 transition-all ease-in-out box-border border border-transparent bg-white dark:bg-[#1e2139] dark:text-white mb-4 ">
                <p className="text-sm font-semibold flex-1">#RT3080</p>
                <p className="text-[#7e88c3] text-[0.685rem] dark:text-white flex-1">
                    Due {formatDate(dueDate)}
                </p>
                <p className="text-[#7e88c3] text-[0.685rem] dark:text-white flex-1">
                    {clientName}
                </p>
                <p className="text-lg font-semibold flex-1">
                    {Intl.NumberFormat("ur-PK", {
                        style: "currency",
                        currency: "PKR",
                    }).format(totalAmount || 0)}
                </p>
                <Button
                    variant={statusButton}
                    className="flex items-center gap-2 flex-1"
                >
                    {status.toLowerCase() === "pending" && (
                        <span
                            className="bg-orange-600 
                     font-extrabold text-lg px-1 py-1 rounded-full"
                        ></span>
                    )}

                    {status.toLowerCase() === "paid" && (
                        <span
                            className="bg-green-600 
                     font-extrabold text-lg px-1 py-1 rounded-full"
                        ></span>
                    )}

                    {status.toLowerCase() === "draft" && (
                        <span
                            className="bg-gray-600 
                     font-extrabold text-lg px-1 py-1 rounded-full"
                        ></span>
                    )}

                    {status.charAt(0).toUpperCase() +
                        status.slice(1).toLowerCase()}
                </Button>
                <Image src={rightArrow} alt="&rarr;" className=" ml-4 block" />
            </div>
        </Link>
    );
}
