"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { NewInvoiceSchema } from "@/schemas";
import { Input } from "@/components/ui/input";

export default function InvoiceForm() {
    const form = useForm<z.infer<typeof NewInvoiceSchema>>({
        resolver: zodResolver(NewInvoiceSchema),
        defaultValues: {
            senderStreetAddress: "",
            senderCity: "",
            senderPostCode: "",
            senderCountry: "",
            clientName: "",
            clientEmail: "",
            clientStreetAddress: "",
            clientCity: "",
            clientPostCode: "",
            clientCountry: "",
            invoiceDueDate: new Date(),
            payementTerms: "",
            projectDescription: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewInvoiceSchema>) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form
                className="space-y-2 mt-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
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
                    name="clientName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client Name</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
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
                                <Input type="text" {...field} />
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
                                <Input type="text" {...field} />
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
                        <FormItem>
                            <FormLabel>Invoice Due Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
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
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="outline-none  focus:outline-purple-700 dark:text-white dark:bg-transparent bg-transparent">
                                        <SelectValue placeholder="Select the time" />
                                    </SelectTrigger>
                                    <SelectContent {...field}>
                                        <SelectItem value="1">
                                            Net 1 day
                                        </SelectItem>
                                        <SelectItem value="7">
                                            Net 7 day
                                        </SelectItem>
                                        <SelectItem value="20">
                                            Net 20 day
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
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

                <button type="submit">Submit Form</button>
            </form>
        </Form>
    );
}
