import mongoose from 'mongoose';
import {DB_NAME} from "../../constants.js";
let isConnected = false;
const connectToMongoDB = async () => {
    try {
        if(!isConnected) {
            await mongoose.connect("mongodb+srv://somu:somu@cluster0.1f4iwcz.mongodb.net/",{dbName: DB_NAME});
            isConnected = !isConnected;
        }
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
};

export default connectToMongoDB;