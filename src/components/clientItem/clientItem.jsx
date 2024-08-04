"use client"
import React from 'react';
import {TableCell, TableRow} from "@/components/ui/table";
import {formatDate, shortenId} from "@/utils/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {BiEdit, BiEnvelope, BiTrash} from "react-icons/bi";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css"
import Link from "next/link";
import DeleteModal from "@/components/widgets/DeleteModal";
import {deleteInvoice} from "@/actions/invoiceActions";
import { toast } from 'react-toastify';
import {sendEmail} from "@/actions/emailActions";
function ClientItem({client}) {

    const onDelete = async (id) => {
        confirm('Are you sure you want to delete this invoice?');
        //create new invoice
        const response = await deleteInvoice(id)
        console.log(response);

        if ( response?.error ){
            toast.error(response?.error);
        }
        if ( response?.message ){
            toast.success(response?.message);
        }
    }

    const sendThisInvoice = async (invoice) => {
        console.log(invoice)
        confirm('Are you sure you want to send this invoice?');

        //create new invoice
        const response = await sendEmail({
            subject: "New Invoice from Barbareshet",
            // message: "This is a new invoice",
            email: "bar.nea27@gmail.com",//user email invoice.customer.email
            data: {
                name: invoice?.customer?.name,
                amount: invoice?.amount
            }
        })
        console.log(response);

        if ( response?.error ){
            toast.error(response?.error);
        }
        if ( response?.message ){
            toast.success(response?.message);
        }
    }
    return (
        <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{shortenId(invoice._id)}</TableCell>
            <TableCell>
                <div className="flex-start space-x-2">
                    {
                        invoice?.customer?.image && (
                            <Avatar>
                                <AvatarImage src={invoice?.customer?.image} alt="@shadcn" />
                                <AvatarFallback>{invoice?.customer?.name.slice(0,2)}</AvatarFallback>
                            </Avatar>
                        )
                    }
                    <span>
                     {invoice?.customer?.name}
                    </span>
                </div>
            </TableCell>
            <TableCell>{invoice?.customer?.businessName}</TableCell>
            <TableCell>{invoice?.customer?.email}</TableCell>
            <TableCell>{invoice?.customer?.phone}</TableCell>
            <TableCell>
                <div className="flex-start space-x-2">
                    <span>
                        <Tooltip placement="top" trigger={['hover']} overlay={<span>Send Invoice</span>}>
                            <BiEnvelope
                                size={24}
                                className="text-purple-900 hover:cursor-pointer"
                                onClick={() => sendThisInvoice(invoice)}
                            />
                        </Tooltip>
                    </span>
                    <span>
                        <Tooltip placement="top" trigger={['hover']} overlay={<span>Edit Invoice</span>}>
                            <Link href={`/?id=${invoice?._id}`}>
                                <BiEdit size={24} className="text-purple-900 hover:cursor-pointer"/>
                            </Link>
                        </Tooltip>
                    </span>
                    <span>
                        <Tooltip placement="top" trigger={['hover']} overlay={<span>Delete Invoice</span>}>
                           <DeleteModal
                               title="Delete Invoice"
                               desc="Click to delete an invoice"
                               password="delete"
                               onClick={() => onDelete(invoice?._id)}
                           />
                        </Tooltip>
                    </span>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default ClientItem;