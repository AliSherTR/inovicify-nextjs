// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import {
//     AlertDialog,
//     AlertDialogContent,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { formatDate } from "@/lib/utils";
// // import DeleteInvoice from "@/components/DeleteInvoice";
// import {
//     Sheet,
//     SheetContent,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet";
// import { db } from "@/lib/db";

// export default async function page({ params }: { params: { id: string } }) {
//     const { id } = params;

//     const data = await db.invoice.findFirst({
//         where: {
//             id,
//         },
//     });
//     return (
//         <div className=" max-w-3xl w-[48rem] ">
//             <Link href="/invoice" className=" flex items-center gap-3 mb-4">
//                 {" "}
//                 <span className=" text-purple-700 font-extrabold text-sm">
//                     {" "}
//                     &lt;{" "}
//                 </span>{" "}
//                 <span className=" font-semibold text-sm tracking-wider">
//                     {" "}
//                     Go Back
//                 </span>
//             </Link>

//             <div className=" px-6 py-9 rounded-xl bg-white dark:bg-[#1e2139] flex items-center justify-between mb-4 shadow-sm">
//                 <div className=" flex items-center gap-3">
//                     <span className=" text-sm mx-4">Status:</span>
//                     <Button
//                         variant={data?.status.toLocaleLowerCase()}
//                         className=" flex items-center gap-3 px-16 "
//                     >
//                         {data?.status && data.status === "pending" && (
//                             <span className="bg-orange-600 font-extrabold text-lg px-1 py-1 rounded-full"></span>
//                         )}
//                         {data?.status && data.status === "paid" && (
//                             <span className="bg-green-600 font-extrabold text-lg px-1 py-1 rounded-full"></span>
//                         )}
//                         {data?.status && data.status === "draft" && (
//                             <span className="bg-gray-600 font-extrabold text-lg px-1 py-1 rounded-full"></span>
//                         )}

//                         {data?.status && (
//                             <span className="mx-1 text-xs">
//                                 {data.status.charAt(0).toUpperCase() +
//                                     data.status.slice(1)}
//                             </span>
//                         )}
//                     </Button>
//                 </div>
//                 <div>
//                     <Sheet>
//                         <SheetTrigger>
//                             <Button
//                                 variant="outline"
//                                 className="rounded-full mx-1"
//                             >
//                                 Edit
//                             </Button>
//                         </SheetTrigger>
//                         <SheetContent
//                             side="left"
//                             className="w-[800px] dark:bg-[#141625]"
//                         >
//                             <SheetTitle>
//                                 {/* Edit Invoice {data.invoiceId} */}
//                             </SheetTitle>
//                             {/* <EditInvoice invoice={data} /> */}
//                         </SheetContent>
//                     </Sheet>

//                     <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                             <Button
//                                 variant="destructive"
//                                 className="rounded-full mx-1"
//                             >
//                                 Delete
//                             </Button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent>
//                             {/* <DeleteInvoice invoice_id={data._id} /> */}
//                         </AlertDialogContent>
//                     </AlertDialog>
//                 </div>
//             </div>

//             <div className=" px-6 py-9 rounded-xl bg-white dark:bg-[#1e2139]">
//                 <div className=" flex justify-between">
//                     <div>
//                         <p className=" font-bold text-sm mb-2">
//                             {" "}
//                             <span className=" text-gray-500">#</span>
//                             {data?.id}
//                         </p>
//                         <p className=" font-light text-sm text-gray-400">
//                             {data?.projectDescription}
//                         </p>
//                     </div>
//                     <div>
//                         <p className=" font-light  text-gray-400  text-xs">
//                             {data?.senderAddress}
//                         </p>
//                         <p className=" font-light text-xs text-gray-400">
//                             {data?.senderCity}
//                         </p>
//                         <p className=" font-light text-xs text-gray-400">
//                             {data?.senderPostCode}
//                         </p>
//                         <p className=" font-light text-xs text-gray-400 ">
//                             {data?.senderCountry}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-3 mt-3">
//                     <div>
//                         {" "}
//                         <h1 className=" text-gray-400 text-sm mb-4 ">
//                             Invoice Date
//                         </h1>
//                         <p>{formatDate(data.createdAt)}</p>
//                         <h1 className=" text-gray-400 text-sm mb-4  mt-8">
//                             Paymet Due
//                         </h1>
//                         <p>{formatDate(data.invoiceDueDate)}</p>
//                     </div>
//                     <div>
//                         <h1 className=" text-gray-400 text-sm mb-4 ">
//                             Bill To
//                         </h1>
//                         <p className="mb-8">{data.client.name}</p>
//                         <p className=" font-light text-xs text-gray-400">
//                             {data.clientAddress.city}
//                         </p>
//                         <p className=" font-light text-xs text-gray-400">
//                             {data.clientAddress.postCode}
//                         </p>
//                         <p className=" font-light text-xs text-gray-400 ">
//                             {data.clientAddress.country}
//                         </p>
//                     </div>
//                     <div>
//                         <h1 className=" font-light  text-gray-400 text-sm mb-4">
//                             Sent To
//                         </h1>
//                         <p>{data.client.email}</p>
//                     </div>
//                 </div>

//                 <div className="max-w-2xl m-auto w-full p-8  mt-8 rounded-xl bg-[#f9fafe] dark:bg-[#252945]">
//                     <Table className="mb-5">
//                         <TableCaption>
//                             A list of prducts in invoice.
//                         </TableCaption>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead className="w-[200px]">
//                                     Item Name
//                                 </TableHead>
//                                 <TableHead>Quantity</TableHead>
//                                 <TableHead>Price</TableHead>
//                                 <TableHead className="text-right">
//                                     Total
//                                 </TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {data.items.map((item, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell className="font-medium">
//                                         {item.name}
//                                     </TableCell>
//                                     <TableCell>{item.quantity}</TableCell>
//                                     <TableCell>
//                                         {" "}
//                                         {Intl.NumberFormat("ur-PK", {
//                                             style: "currency",
//                                             currency: "PKR",
//                                         }).format(item.price)}{" "}
//                                     </TableCell>
//                                     <TableCell className="text-right">
//                                         {Intl.NumberFormat("ur-PK", {
//                                             style: "currency",
//                                             currency: "PKR",
//                                         }).format(item.total)}
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>

//                     <div className=" flex justify-between bg-[#252945] dark:bg-black px-4 py-8 rounded-b-xl text-white">
//                         <h1 className=" text-xs  text-gray-400">Amount Due</h1>
//                         <h1 className=" text-xl font-bold ">
//                             {Intl.NumberFormat("ur-PK", {
//                                 style: "currency",
//                                 currency: "PKR",
//                             }).format(data.total)}
//                         </h1>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
