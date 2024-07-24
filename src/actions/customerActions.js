"use server"
import { connectDB } from "@/db/db";
import Customer from "@/models/Customer";
import { revalidatePath } from "next/cache";
import { getErrorMessages } from "@/utils/getErrorMessages";

export const createCustomer = async (formData) => {
    const { customer, amount, status } = formData;

    try{
        if ( !amount || !customer || !status ){
            return{
                error: "PLease fill in all fields"
            }
        }
        const connection = await connectDB();
        const createCustomer = await Customer.create({
            customer,
            amount,
            status,
        })
        revalidatePath("/");
        return {
            message: "Customer created successfully"
        }
    } catch (error){
        console.error(error)
        return {
            error: getErrorMessages(error)
        }
    }
}
export const getCustomers = async (params) => {
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const skip = ( page -1 ) * limit;

    const query = {
        ...( params.search &&
            {
                $or: [
                    { amount: { $regex: params.search, $options: "i" } },
                    { status: { $regex: params.search, $options: "i" } },
                    { "customer.name": { $regex: params.search, $options: "i" } },
                    { "customer.email": { $regex: params.search, $options: "i" } },
                ],
            }
        )
    }

    try{

        await connectDB();
        const Customers = await Customer.find(query)
            .skip(skip)
            .limit(limit)
        const totalItems = await Customer.countDocuments(query);
        const pageCount = Math.ceil( totalItems / limit );

        return JSON.stringify({
            totalItems,
            pageCount,
            data: Customers,
        });

    } catch (error){
        console.error(error)
        return {
            error: getErrorMessages(error)
        }
    }
}