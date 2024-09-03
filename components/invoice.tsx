import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import rightArrow from "@/public/icon-arrow-right.svg";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface InvoiceProps {
    id: string;
    dueDate: string;
    clientName: string;
    amount?: string;
    status: string;
}

export default function Invoice({
    id,
    dueDate,
    clientName,
    amount,
    status,
}: InvoiceProps) {
    return (
        <Link href={`/invoice/${id}`}>
            <div className=" flex items-center justify-between gap-4 py-7 rounded-[10px]  px-4 cursor-pointer hover:border-purple-800 transition-all ease-in-out box-border border border-transparent bg-white dark:bg-[#1e2139] dark:text-white mb-4 ">
                <p className="text-sm font-semibold flex-1">#RT3080</p>
                <p className="text-[#7e88c3] text-[0.685rem] dark:text-white flex-1">
                    Due {formatDate(dueDate)}
                </p>
                <p className="text-[#7e88c3] text-[0.685rem] dark:text-white flex-1">
                    {clientName}
                </p>
                <p className="text-lg font-semibold flex-1">
                    {/* {Intl.NumberFormat("ur-PK", {
                        style: "currency",
                        currency: "PKR",
                    }).format(amount)} */}
                    $ 8800
                </p>
                <Button className="flex items-center gap-2 flex-1">
                    {status === "pending" && (
                        <span
                            className="bg-orange-600 
                     font-extrabold text-lg px-1 py-1 rounded-full"
                        ></span>
                    )}

                    {status === "paid" && (
                        <span
                            className="bg-green-600 
                     font-extrabold text-lg px-1 py-1 rounded-full"
                        ></span>
                    )}

                    {status === "draft" && (
                        <span
                            className="bg-gray-600 
                     font-extrabold text-lg px-1 py-1 rounded-full"
                        ></span>
                    )}

                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
                <Image src={rightArrow} alt="&rarr;" className=" ml-4 block" />
            </div>
        </Link>
    );
}
