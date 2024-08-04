"use server"
import { connectDB } from "@/db/db";
import Invoice from "@/models/invoice";
import { revalidatePath } from "next/cache";
import { getErrorMessages } from "@/utils/getErrorMessages";

/**
 * create new invoice
 * @param formData
 * @returns {Promise<{error}|{error: string}|{message: string}>}
 */
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

/**
 * Get all invoices
 * @param params
 * @returns {Promise<{error}|string>}
 */
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
                    { "customer.phone": { $regex: params.search, $options: "i" } },
                    { "customer.businessName": { $regex: params.search, $options: "i" } },
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
/**
 * Delete an invoice
 * @param id
 * @returns {Promise<{error}|{error: string}|{message: string}>}
 */
export const deleteInvoice = async (id) => {

    try{
        if ( !id ){
            return{
                error: "Invoice not found"
            }
        }

        await connectDB();
        await Invoice.findByIdAndDelete(id);
        revalidatePath("/");
        return {
            message: "Invoice deleted successfully"
        }


    } catch (error){
        console.error(error)
        return {
            error: getErrorMessages(error)
        }
    }
}
/**
 * Get Single Invoice
 * @param id
 * @returns {Promise<{error}|{error: string}|string>}
 */
export const getInvoice = async (id) => {

    try{
        if ( !id ){
            return{
                error: "Invoice not found"
            }
        }

        await connectDB();
        const invoice = await Invoice.findById(id);

        return JSON.stringify(invoice)


    } catch (error){
        console.error(error)
        return {
            error: getErrorMessages(error)
        }
    }
}

/**
 * Update Invoice
 * @param formData
 * @returns {Promise<{error}|{error: string}|string>}
 */
export const updateInvoice = async (formData) => {
    const { customer, amount, status, id } = formData;
    try{
        if ( !id ){
            return{
                error: "Invoice not found"
            }
        }

        await connectDB();
        await Invoice.findByIdAndUpdate(id, {
            amount,
            status
        });

        revalidatePath('/');
        return {
            message: "Invoice updated succesfully"
        }

    } catch (error){
        console.error(error)
        return {
            error: getErrorMessages(error)
        }
    }
}

export const sendInvoice = async () => {

}