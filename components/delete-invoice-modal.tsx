"use client";
import React from "react";
import {
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { deleteInvoice } from "@/actions/invoices/delete-invoice";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type InvoiceDeleteProps = {
    id: string;
};

export default function DeleteInvoice({ id }: InvoiceDeleteProps) {
    const router = useRouter();
    const { toast } = useToast();
    async function handleDelete(id: string) {
        await deleteInvoice(id);
        toast({
            title: "Invoice Deleted",
            description: "Successfully deleted the invoice",
        });
        router.push("/invoices");
    }
    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the invoice and remove invoice data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                    Cancel
                </AlertDialogCancel>

                <Button
                    onClick={() => handleDelete(id)}
                    variant="destructive"
                    className="rounded-full mx-1"
                >
                    Delete
                </Button>
            </AlertDialogFooter>
        </>
    );
}
