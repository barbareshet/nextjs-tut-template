"use client"
import React, { useEffect, useState } from 'react';
import ActionModal from "@/components/widgets/ActionModal";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'react-toastify';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/widgets/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { createInvoice, getInvoice, updateInvoice } from "@/actions/invoiceActions";
import { getCustomersList } from "@/actions/customerActions";

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
});

function CreateInvoice() {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    // Fetch customers when the component mounts
    useEffect(() => {
        const fetchCustomers = async () => {
            const res = await getCustomersList();
            const customers = res.data;
            setCustomers(customers);
        };

        fetchCustomers();
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: "",
            status: "Unpaid"
        },
    });

    async function onSubmit(values) {
        const { name, amount, status } = values;
        const customer = customers.find((c) => c.name === name);

        const formData = {
            amount,
            customer,
            status,
            id: id ? id : ""
        };

        if (id) {
            // Update invoice action
            const response = await updateInvoice(formData);

            if (response?.error) {
                toast.error(response?.error);
            }
            if (response?.message) {
                toast.success(response?.message);
                setTimeout(() => {
                    setOpen(!open);
                }, 2500);
            }
        } else {
            // Create new invoice
            const response = await createInvoice(formData);

            if (response?.error) {
                toast.error(response?.error);
            }
            if (response?.message) {
                toast.success(response?.message);
                form.reset();
                setTimeout(() => {
                    setOpen(!open);
                }, 2500);
            }
        }
    }

    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (id) {
            const fetchInvoiceData = async () => {
                const res = await getInvoice(id);
                const invoice = JSON.parse(res);

                form.setValue("name", invoice?.customer?.name);
                form.setValue("amount", invoice?.amount);
                form.setValue("status", invoice?.status);
            };

            setOpen(true);
            fetchInvoiceData(id);
        }
    }, [id]);

    useEffect(() => {
        if (!open) {
            router.replace('/');
        }
    }, [open, router]);

    return (
        <div>
            <ActionModal
                title="Create Invoice"
                desc="Create a New Invoice"
                trigger={
                    <Button className="text-white space-x-1 bg-purple-600 hover:bg-purple-800">
                        <span>Create Invoice</span>
                        <span className="text-2xl">+</span>
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
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a customer" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Customer</SelectLabel>
                                                {customers.map(customer => (
                                                    <SelectItem key={customer._id} value={customer.name}>{customer.name} <small>({customer.businessName})</small></SelectItem>
                                                ))}
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
                                            value={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="unpaid" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Unpaid</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="paid" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Paid</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isLoading ? (
                            <LoadingButton btnClass="w-full" btnText="Loading" btnVariant="outline" />
                        ) : (
                            <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
                                {id ? "Update Invoice" : "Create Invoice"}
                            </Button>
                        )}
                    </form>
                </Form>
            </ActionModal>
        </div>
    );
}

export default CreateInvoice;
