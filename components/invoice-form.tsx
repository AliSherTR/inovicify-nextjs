"use client";

import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Trash } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewInvoiceSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { addInvoice } from "@/actions/invoices/add-invoice";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useToast } from "@/hooks/use-toast";
import { editInvoice } from "@/actions/invoices/edit-invoice";

type InvoiceItems = {
    id: string;
    name: string;
    quantity: number; // Allow both string and number
    price: number;
    invoiceId: string;
};

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

interface InvoiceFormProps {
    invoice?: Invoice | null;
}

export default function InvoiceForm({ invoice }: InvoiceFormProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof NewInvoiceSchema>>({
        resolver: zodResolver(NewInvoiceSchema),
        defaultValues: {
            senderStreetAddress: invoice?.senderAddress || "",
            senderCity: invoice?.senderCity || "",
            senderPostCode: invoice?.senderPostCode || "",
            senderCountry: invoice?.senderCountry || "",
            clientName: invoice?.receiverName || "",
            clientEmail: invoice?.receiverEmail || "",
            clientStreetAddress: invoice?.receiverAddress || "",
            clientCity: invoice?.receiverCity || "",
            clientPostCode: invoice?.receiverPostCode || "",
            invoiceDueDate: invoice?.dueDate || new Date(),
            clientCountry: invoice?.receiverCountry || "",
            payementTerms: invoice?.paymentTerms || "",
            projectDescription: invoice?.projectDescription || "",
            items: invoice?.items || [
                { id: "", name: "", quantity: 0, price: 0 },
            ],
            status: invoice?.status || "",
        },
    });

    console.log(invoice);

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const [totalPrices, setTotalPrices] = useState<number[]>(
        invoice?.items.map((item) => item.price * item.quantity || 0) || []
    );

    const onQuantityOrPriceChange = (
        index: number,
        quantity: number,
        price: number
    ) => {
        const newTotalPrices = [...totalPrices];
        newTotalPrices[index] = (quantity || 0) * price;
        setTotalPrices(newTotalPrices);
    };

    const onSubmit = (values: z.infer<typeof NewInvoiceSchema>) => {
        startTransition(() => {
            if (invoice) {
                editInvoice(values, invoice.id).then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
            } else {
                addInvoice(values).then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                    if (data?.success) {
                        window.location.reload();
                    }
                });
            }
        });
    };

    return (
        <Form {...form}>
            <form
                className="space-y-5 mt-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <h1 className=" font-semibold text-purple-600">Bill From</h1>
                <FormField
                    control={form.control}
                    name="senderStreetAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Senders information section with 3 cols */}
                <div className=" flex w-full gap-x-3">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="senderCity"
                            defaultValue={invoice?.senderCity}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="senderPostCode"
                            defaultValue={invoice?.senderPostCode}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Post Code</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="senderCountry"
                            defaultValue={invoice?.senderCountry}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <h1 className=" font-semibold text-purple-600">Bill To</h1>

                <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    {...field}
                                    defaultValue={invoice?.receiverName}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    {...field}
                                    defaultValue={invoice?.receiverEmail}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="clientStreetAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client Address</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    {...field}
                                    defaultValue={invoice?.receiverAddress}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Client's information section with 3 cols */}
                <div className=" flex w-full gap-x-3">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="clientCity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            defaultValue={invoice?.receiverCity}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="clientPostCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Post Code</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="clientCountry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="invoiceDueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Invoice Due Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                " pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        onSelect={field.onChange}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="payementTerms"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Terms</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the payement time" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1">Net 1 day</SelectItem>
                                    <SelectItem value="7">Net 7 day</SelectItem>
                                    <SelectItem value="20">
                                        Net 20 day
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <h1 className="font-semibold text-purple-600">Invoice Items</h1>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-x-3">
                        <FormField
                            control={form.control}
                            name={`items.${index}.name`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            onChange={(e) => {
                                                // Convert the string value to a number
                                                const valueAsNumber =
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0;

                                                field.onChange(valueAsNumber);
                                                onQuantityOrPriceChange(
                                                    index,
                                                    form.getValues(
                                                        `items.${index}.price`
                                                    ),
                                                    valueAsNumber
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`items.${index}.price`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => {
                                                // Convert the string value to a number
                                                const valueAsNumber =
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0;

                                                field.onChange(valueAsNumber);
                                                onQuantityOrPriceChange(
                                                    index,
                                                    form.getValues(
                                                        `items.${index}.quantity`
                                                    ),
                                                    valueAsNumber
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <span className="self-center text-sm flex-1 mt-7 text-center">
                            {totalPrices[index] || 0}
                        </span>
                        <button
                            className="mt-7 text-sm self-center"
                            type="button"
                            onClick={() => remove(index)}
                        >
                            <Trash size={20} />
                        </button>
                    </div>
                ))}

                <div>
                    <Button
                        className="w-full text-center"
                        type="button"
                        onClick={() =>
                            append({ name: "", quantity: 0, price: 0 })
                        }
                    >
                        Add Item
                    </Button>
                </div>

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="PAID">Paid</SelectItem>
                                    <SelectItem value="PENDING">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="DRAFT">Draft</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    {invoice ? "Update Invoice" : "Create Invoice"}
                </Button>

                <FormError message={error} />
                <FormSuccess message={success} />
            </form>
        </Form>
    );
}
