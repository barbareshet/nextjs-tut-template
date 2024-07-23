"use client"
import React, {useState} from 'react';
import ActionModal from "@/components/widgets/ActionModal";
import {Button} from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import customers from "@/db/customers";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input";
import {Loader} from "lucide-react";
import {LoadingButton} from "@/components/widgets/Loader";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Full Name is required.",
    }),
    status: z.string().min(2, {
        message: "Status is required.",
    }),
    amount: z.string().min(1, {
        message: "Amount is required.",
    }),
})



function CreateInvoice() {
    const [open, setOpen] = useState(false);

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount:"",
            status:"Unpaid"
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values) {
        const {name, amount, status} = values;
        console.log({name, amount, status})
    }

    const isLoading = form.formState.isSubmitting;

    return (
        <div>
            <ActionModal
            title="Create Invoice"
            desc="Create a New Invoice"
            trigger={
                <Button className="text-white space-x-1 bg-purple-600 hover:bg-purple-800">
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a customer" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Customer
                                                </SelectLabel>
                                                {
                                                    customers.map( customer => {
                                                        return (
                                                            <SelectItem key={customer.id} value={customer.name}>{customer.name}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0.00" type={"number"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="unpaid" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Unpaid
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="paid" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Paid
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            isLoading ? (
                                <LoadingButton btnClass="w-full" btnText="Loading" btnVariant="outline"/>
                            ) : (
                                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-800">Submit</Button>
                            )
                        }
                    </form>
                </Form>
            </ActionModal>
        </div>
    );
}

export default CreateInvoice;