"use client"
import React, {useState} from 'react';
import ActionModal from "@/components/widgets/ActionModal";
import {Button} from "@/components/ui/button";

function CreateInvoice() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <ActionModal
            title="Create Invoice"
            desc="Create a New Invoice"
            trigger={
                <Button className="text-white space-x-1">
                    <span>
                        Create Invoice
                    </span>
                    <span className="text-2xl">
                        +
                    </span>
                </Button>
            }
            open={open}
            setOpen={setOpen}
            >
                <h1>
                    Invoice
                </h1>
            </ActionModal>
        </div>
    );
}

export default CreateInvoice;