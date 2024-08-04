"use client"
import React, {useState} from 'react';
import ActionModal from "@/components/widgets/ActionModal";
import {Button} from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import customers from "@/db/customers";
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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input";
import {LoadingButton} from "@/components/widgets/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { createCustomer } from "@/actions/customerActions";


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Full Name is required.",
    }),
    businessName: z.string().min(2, {
        message: "Business Name is required.",
    }),
    phone: z.string().min(2, {
        message: "Phone is required.",
    }),
    email: z.string().min(2, {
        message: "Email is required.",
    }),
    description: z.string()
        .min(10, {
            message: "Business Description must be at least 10 characters.",
        })
        .max(160, {
            message: "Business Description must not be longer than 160 characters.",
        }),
    image: z.string().min(2, {
        message: "Logo url is required.",
    }),

})



function CreateClient() {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    // const id = searchParams.get("id");
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            businessName:"",
            description:"",
            email:"",
            phone:"",
            image:"",
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values) {
        const { name,businessName, description, email, phone,  image} = values;
        const customerExists = customers.find((c) => c.email === email);
        console.log(values)

        const formData = {
            name,
            businessName,
            description,
            email,
            phone,
            image,
        }

        console.log(formData)
        if (customerExists){
            // update Customer action
            toast.error("Customer already exists");
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...field} type="text" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="businessName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <Input {...field} type="text" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Description</FormLabel>
                                    <Textarea {...field} className="resize-none" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} type="email" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <Input {...field} type="text" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <Input {...field} type="text" />
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
