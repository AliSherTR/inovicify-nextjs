import React from "react";
import Invoice from "./invoice";

interface InvoicePageProps {
    invoices: any;
    status: string;
}

export default function InvoicePage({ invoices, status }: InvoicePageProps) {
    return (
        <div className=" mt-5  m-auto">
            {invoices?.map((invoice: any) => {
                return (
                    <Invoice
                        key={invoice.id}
                        id={invoice.id}
                        dueDate={`${invoice.dueDate}`}
                        clientName={invoice.receiverName}
                        status={invoice.status}
                    />
                );
            })}
        </div>
    );
}
