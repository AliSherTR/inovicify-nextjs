"use client";
import { getInvoices } from "@/actions/invoices/getInvoice";
import InvoiceForm from "@/components/invoice-form";
import InvoicePage from "@/components/invoice-page";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface InvoiceItems {
    id: string;
    name: string;
    quantity: number;
    price: number;
    invoiceId: string;
}

interface Invoice {
    id: string;
    senderAddress: string;
    senderCity: string;
    senderPostCode: string;
    senderCountry: string;
    receiverName: string;
    receiverEmail: string;
    receiverAddress: string;
    receiverCity: string;
    receiverPostCode: string;
    receiverCountry: string;
    userId: string;
    status: string;
    invoiceDate: Date;
    dueDate: Date;
    paymentTerms: string;
    items: InvoiceItems[];
    projectDescription: string;
}

export default function AllInvoices() {
    const [invoices, setInvoices] = useState<Invoice[] | undefined>(undefined);
    const [filteredInvoices, setFilteredInvoices] = useState<
        Invoice[] | undefined
    >(undefined);
    const [status, setStatus] = useState<string | undefined>(undefined);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getInvoice() {
            setIsLoading(true);
            const data = await getInvoices();
            setInvoices(data);
            setIsLoading(false);
        }

        getInvoice();
    }, []);

    useEffect(() => {
        if (status && invoices) {
            const filtered = invoices.filter(
                (invoice) => invoice.status === status
            );
            setFilteredInvoices(filtered);
        } else {
            setFilteredInvoices(invoices);
        }
    }, [status, invoices]);

    if (isLoading) return <LoaderIcon />;

    return (
        <div className=" max-w-3xl w-[80rem]">
            <div className="flex px-3 py-2 m-auto w-full justify-between items-center">
                <div>
                    <h2 className="dark:text-white text-2xl font-semibold mb-5">
                        All Invoices
                    </h2>
                    <p className="dark:text-white text-[#888eb0] text-[0.75rem]">
                        {!invoices?.length
                            ? "No Invoices"
                            : `There are total ${invoices?.length} invoices`}
                    </p>
                </div>
                <div className=" flex items-center justify-between gap-4">
                    <Select onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger className=" justify-self-end">
                            <SelectValue placeholder="Filter By Status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="PAID">Paid</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className=" ">
                        <Sheet>
                            <SheetTrigger className=" flex-1 w-[120%] me-2 px-2 gap-3 py-2 text-xs flex items-center bg-blue-500 rounded-[50px] text-white font-bold">
                                <span className="rounded-full bg-white flex items-center justify-center p-3">
                                    <svg
                                        width="11"
                                        height="11"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                                            fill="#7C5DFA"
                                            fillRule="nonzero"
                                        ></path>
                                    </svg>
                                </span>
                                <span className="me-2">New Invoice</span>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[800px]">
                                <SheetTitle>New Invoice</SheetTitle>
                                <InvoiceForm />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
            <InvoicePage invoices={filteredInvoices} status="Paid" />
        </div>
    );
}
