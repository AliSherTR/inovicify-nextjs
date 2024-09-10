import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn, formatDate } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { db } from "@/lib/db";
import DeleteInvoice from "@/components/delete-invoice-modal";
import InvoiceForm from "@/components/invoice-form";

export default async function Invoice({ params }: { params: { id: string } }) {
    const { id } = params;

    const data = await db.invoice.findFirst({
        where: {
            id,
        },
        include: {
            items: true,
        },
    });

    const totalAmount = data?.items.reduce((acc, item) => {
        const quantity = item.quantity || 0;
        const price = item.price || 0;

        return acc + quantity * price;
    }, 0);

    return (
        <div className="max-w-3xl w-[48rem] mt-5 mb-16">
            <Link
                href="/invoices"
                className="flex items-center space-x-4  mb-4"
            >
                <span className="font-semibold text-sm text-purple-500">
                    &larr;
                </span>
                <span className=" text-sm text-purple-500">Go Back</span>
            </Link>
            <div className="px-6 py-3 rounded-xl bg-white dark:bg-[#1e2139] flex items-center justify-between mb-4 shadow-sm">
                <div className="space-x-3">
                    <span className=" text-sm mx-4">Status:</span>
                    <Button
                        variant={"invoice"}
                        className={cn(
                            "items-center space-x-2 inline-flex",
                            data?.status.toLocaleLowerCase() === "paid" &&
                                "bg-[#33d69f]/10",
                            data?.status.toLocaleLowerCase() === "pending" &&
                                "bg-[#ff8f00]/10"
                        )}
                    >
                        {data?.status &&
                            data?.status.toLocaleLowerCase() === "pending" && (
                                <span className="bg-orange-600 font-extrabold text-lg px-1 py-1 rounded-full"></span>
                            )}
                        {data?.status &&
                            data?.status.toLocaleLowerCase() === "paid" && (
                                <span className="bg-green-600 font-extrabold text-lg px-1 py-1 rounded-full"></span>
                            )}
                        {data?.status &&
                            data?.status.toLocaleLowerCase() === "draft" && (
                                <span className="bg-gray-600 font-extrabold text-lg px-1 py-1 rounded-full"></span>
                            )}

                        {data?.status && (
                            <span className="mx-1 text-xs">
                                {data.status.charAt(0).toUpperCase() +
                                    data.status.slice(1)}
                            </span>
                        )}
                    </Button>
                </div>

                <div className="space-x-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant={"outline"}
                                className="rounded-full"
                            >
                                Edit
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-[800px] dark:bg-[#141625]"
                        >
                            <SheetTitle>Edit Invoice</SheetTitle>
                            <InvoiceForm invoice={data} />
                        </SheetContent>
                    </Sheet>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="rounded-full "
                            >
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <DeleteInvoice id={data?.id as string} />
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div className="px-6 py-3 rounded-xl bg-white dark:bg-[#1e2139]">
                <div className=" flex justify-between">
                    <div>
                        <p className=" font-light text-sm text-gray-400">
                            {data?.projectDescription}
                        </p>
                    </div>
                    <div>
                        <p className=" font-light  text-gray-400  text-xs">
                            {data?.senderAddress}
                        </p>
                        <p className=" font-light text-xs text-gray-400">
                            {data?.senderCity}
                        </p>
                        <p className=" font-light text-xs text-gray-400">
                            {data?.senderPostCode}
                        </p>{" "}
                        <p className=" font-light text-xs text-gray-400 ">
                            {data?.senderCountry}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 mt-3">
                    <div>
                        {" "}
                        <h1 className=" text-gray-400 text-sm mb-4 ">
                            Invoice Date
                        </h1>
                        <p>
                            {formatDate(
                                data?.invoiceDate.toLocaleString() as string
                            )}
                        </p>
                        <h1 className=" text-gray-400 text-sm mb-4  mt-2">
                            Paymet Due
                        </h1>
                        <p>
                            {`${data?.dueDate.getDate()}-${data?.dueDate.getMonth()}-${data?.dueDate.getUTCFullYear()}`}
                        </p>
                    </div>
                    <div>
                        <h1 className=" text-gray-400 text-sm mb-2 ">
                            Bill To
                        </h1>
                        <p className="mb-2">{data?.receiverName}</p>
                        <p className=" font-light text-xs text-gray-400">
                            {data?.receiverAddress}
                        </p>
                        <p className=" font-light text-xs text-gray-400">
                            {data?.receiverPostCode}
                        </p>
                        <p className=" font-light text-xs text-gray-400 ">
                            {data?.receiverCity}
                        </p>
                    </div>{" "}
                    <div>
                        <h1 className=" font-light  text-gray-400 text-sm mb-4">
                            Sent To
                        </h1>
                        <p>{data?.receiverEmail}</p>
                    </div>
                </div>

                <div className="max-w-2xl m-auto w-full p-8  mt-8 rounded-xl bg-[#f9fafe] dark:bg-[#252945]">
                    <Table className="mb-5">
                        <TableCaption>
                            A list of prducts in invoice.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Item Name
                                </TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">
                                    Total
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {item.name}
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        {Intl.NumberFormat("ur-PK", {
                                            style: "currency",
                                            currency: "PKR",
                                        }).format(item.price)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {Intl.NumberFormat("ur-PK", {
                                            style: "currency",
                                            currency: "PKR",
                                        }).format(item.price * item.quantity)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className=" flex justify-between bg-[#252945] dark:bg-black px-4 py-8 rounded-b-xl text-white">
                        <h1 className=" text-xs  text-gray-400">
                            {data?.status === "PAID"
                                ? "Amount Paid"
                                : "Amount Due"}
                        </h1>
                        <h1 className=" text-xl font-bold ">
                            {Intl.NumberFormat("ur-PK", {
                                style: "currency",
                                currency: "PKR",
                            }).format(totalAmount || 0)}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
