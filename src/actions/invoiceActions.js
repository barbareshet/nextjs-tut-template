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