import mongoose, {models, Schema} from "mongoose";

const customerModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default:"https://i.pravatar.cc/300?img=1"
    }
},
    {
        timestamps: true
    }
)
const customer = models?.customer || mongoose.model("customer", customerModel );
export default customer;