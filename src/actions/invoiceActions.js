"use server"
import { connectDB } from "@/db/db";
import Invoice from "@/models/invoice";
import { revalidatePath } from "next/cache";
import { getErrorMessages } from "@/utils/getErrorMessages";

export const createInvoice = async (formData) => {
    const { customer, amount, status } = formData;

    try{
        if ( !amount || !customer || !status ){
            return{
                error: "PLease fill in all fields"
            }
        }
        const connection = await connectDB();
        const createInvoice = await Invoice.create({
            customer,
            amount,
            status,
        })
        revalidatePath("/");
        return {
            message: "Invoice created successfully"
        }
    } catch (error){
        console.error(error)
        return {
            error: getErrorMessages(error)
        }
    }
}
export const getInvoices = async (params) => {
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
        const invoices = await Invoice.find(query)
            .skip(skip)
            .limit(limit)
        const totalItems = await Invoice.countDocuments(query);
        const pageCount = Math.ceil( totalItems / limit );

        return JSON.stringify({
            totalItems,
            pageCount,
            data: invoices,
        });

    } catch (error){
        console.error(error)
        return {
            error: getErrorMessages(error)
        }
    }
}