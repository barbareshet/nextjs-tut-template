"use client"
import React, {useEffect, useRef, useState} from 'react';
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
import { Badge } from "@/components/ui/badge"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { formatDate, shortenId, calculateSums } from "@/utils/utils";
import ReactPaginate from 'react-paginate';
import { BiEdit, BiEnvelope, BiTrash} from "react-icons/bi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import InvoiceItem from "@/components/invoiceItem/InvoiceItem";
function ListInvoice({total, pageNumber, invoices}) {

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef(1);

    const [search, setSearch] = useState("");
    // Pagination Start
    useEffect(() => {
        if (total > 0){
            setPageCount(pageNumber);
        }
    }, [pageNumber, total]);

    function handlePageClick(e) {
        // console.log(e)
        const params = new URLSearchParams(searchParams.toString());
        if ( currentPage.current ){
            params.set( "page", e.selected + 1 )
        }
        currentPage.current = e.selected + 1;
        router.replace(`${pathName}?${params.toString()}`);
    }
    // Pagination End

    const { paid, unpaid } = calculateSums(invoices);
    // console.log({total, pageNumber, invoices})

    // Search Start
    const handleSearchChange = async (e) => {

    }

    // Debounce callback
    const debouncedHandleSearch = useDebouncedCallback(
        // function
        () => {
            const params = new URLSearchParams(searchParams.toString());
            params.set( "page", 1 )
            if ( search ){
                params.set( "search", search )
            } else {
                params.delete( "search" )
            }

            router.replace(`${pathName}?${params.toString()}`);
        },
        // delay in ms
        3000
    );
    useEffect(() => {
        debouncedHandleSearch()
    }, [search]);
    // Search End


    return (
        <div>
            <div className="flex-between border-b-[1px] border-gray-400 pb-3 pt-2">
                <p className="text-sm">There are {total} Invoices</p>
                <Search
                    value={search}
                    defaultValue={""}
                    placeHolder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="table w-full">
                <Table className="w-full">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="w-full">
                        {invoices.map((invoice) => (
                            <InvoiceItem invoice={invoice} key={invoice._id}/>
                        ))}
                    </TableBody>
                    <TableFooter className="w-full">
                        <TableRow className="w-full">
                            <TableCell colSpan={4}>Total Paid</TableCell>
                            <TableCell colSpan={4} className="text-right">${paid}</TableCell>
                        </TableRow>
                        <TableRow className="w-full">
                            <TableCell colSpan={4}>Total Unpaid</TableCell>
                            <TableCell colSpan={4} className="text-right">${unpaid}</TableCell>
                        </TableRow>
                        <TableRow className="w-full">
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell colSpan={4} className="text-right">${paid - unpaid}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            {
                invoices.length > 0 && (
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="< Prev"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName="page-num"
                        previousClassName="page-num page-num-prev"
                        nextClassName="page-num page-num-next"
                        activeClassName="activePage"
                    />
                )
            }
        </div>
    );
}

export default ListInvoice;