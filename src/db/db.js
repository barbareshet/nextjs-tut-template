import mongoose from "mongoose";
import {console} from "next/dist/compiled/@edge-runtime/primitives";


export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.NEXT_MONGODB_URI)
        if ( connection ){
            console.log("Connection Success")
            return true
        }
    } catch (error){
        console.error("Connection Error", error)
        process.exit(1)
    }
}