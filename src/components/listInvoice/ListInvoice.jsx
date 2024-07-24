import React from 'react';
import Search from "@/components/widgets/Search";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { formatDate, shortenId, calculateSums } from "@/utils/utils";

function ListInvoice({total, pageNumber, invoices}) {

    const { paid, unpaid } = calculateSums(invoices);
    // console.log({total, pageNumber, invoices})
    const handleSearchChange = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <div className="flex-between border-b-[1px] border-gray-400 pb-3 pt-2">
                <p className="text-sm">There are {total} Invoices</p>
                <Search
                    value={""}
                    defaultValue={""}
                    placeHolder="Search..."
                    onChange={""}
                />
            </div>
            <div className="table w-full">
                <Table className="w-full">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="w-full">
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{shortenId(invoice._id)}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                                <TableCell>{invoice.customer.name}</TableCell>
                                <TableCell>{invoice.customer.email}</TableCell>
                                <TableCell className="text-right">{invoice.amount}</TableCell>
                                <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="w-full">
                        <TableRow>
                            <TableCell colSpan={3}>Total Paid</TableCell>
                            <TableCell className="text-right">${paid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>Total Unpaid</TableCell>
                            <TableCell className="text-right">${unpaid}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}

export default ListInvoice;