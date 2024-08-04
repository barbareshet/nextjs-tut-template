"use server"
import { connectDB } from "@/db/db";
import Customer from "@/models/Customer";
import { revalidatePath } from "next/cache";
import { getErrorMessages } from "@/utils/getErrorMessages";

/**
 *
 * @param formData
 * @returns {Promise<{error}|{error: string}|{message: string}>}
 */
export const createCustomer = async (formData) => {
    const { name, businessName, description, email, phone, image } = formData;
    console.log({formData})
    try {
        if (!name || !businessName || !description || !email || !phone) {
            return {
                error: "Please fill in all fields"
            };
        }

        console.log("Connecting to DB...");
        await connectDB();

        console.log("Creating customer with data:", formData);
        await Customer.create({
            name,
            businessName,
            description,
            email,
            phone,
            image
        });

        console.log("Customer created, revalidating path...");
        revalidatePath("/");

        return {
            message: "Customer created successfully"
        };
    } catch (error) {
        console.error("Error occurred:", error);
        return {
            error: getErrorMessages(error)
        };
    }
};

/**
 *
 * @param search
 * @param page
 * @param limit
 * @returns {Promise<string>}
 */
export async function getCustomers({ search = "", page = 1, limit = 5 }) {
    await connectDB();

    // Implement your logic to fetch customers
    const customers = await Customer.find()
        .skip((page - 1) * limit)
        .limit(limit);

    const totalItems = await Customer.countDocuments();
    const pageCount = Math.ceil(totalItems / limit);

    return JSON.stringify({
        data: customers,
        totalItems,
        pageCount,
    });
}

/**
 * Get clients list
 * @returns {Promise<{totalItems: awaited Query<number, THydratedDocumentType, TQueryHelpers, TRawDocType, "countDocuments", TInstanceMethods> & TQueryHelpers, data: awaited Query<Array<THydratedDocumentType>, THydratedDocumentType, TQueryHelpers, TRawDocType, "find", TInstanceMethods> & TQueryHelpers}>}
 */
export async function getCustomersList() {
    await connectDB();

    // Fetch customers from the database
    const customers = await Customer.find();
    const totalItems = await Customer.countDocuments();

    // Return customers data as a JavaScript object
    return {
        data: customers,
        totalItems
    };
}