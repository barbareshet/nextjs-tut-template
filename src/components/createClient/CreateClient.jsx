"use client"
import React, {useState} from 'react';
import ActionModal from "@/components/widgets/ActionModal";
import {Button} from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import customers from "@/db/customers";
import { toast } from 'react-toastify';
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
import {LoadingButton} from "@/components/widgets/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import {createCustomer} from "@/actions/CustomerActions";


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



function CreateClient() {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const id = searchParams.get("id");
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
    async function onSubmit(values) {
        const {name, email, image} = values;
        const customerExists = customers.find((c) => c.email === email);
        console.log({name, email, image})

        const formData = {
            name,
            email,
            image,
            id: id ? id : ""
        }
        if (customerExists){
            // update Customer action
        } else {
            //create new Customer
            const response = await createCustomer(formData)
            

            if ( response?.error ){
                toast.error(response?.error);
            }
            if ( response?.message ){
                toast.success(response?.message);
                form.reset();
                setTimeout( () => {
                    setOpen(!open)
                }, 2500)
            }
        }
    }

    const isLoading = form.formState.isSubmitting;

    return (
        <div>
            <ActionModal
            title="Create Customer"
            desc="Create a New Customer"
            trigger={
                <Button className="text-white space-x-1 bg-black hover:bg-purple-900">
                    <span>
                        New Customer
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
                            id="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text"/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            id="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email"/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            id="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <Input type="text"/>
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

export default CreateClient;