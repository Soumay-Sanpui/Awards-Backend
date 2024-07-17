import mongoose from 'mongoose';
import {DB_NAME, MONGOURI} from "../../constants.js";
let isConnected = false;
const connectToMongoDB = async () => {
    try {
        if(!isConnected) {
            await mongoose.connect(MONGOURI,{dbName: DB_NAME});
            isConnected = !isConnected;
        }
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
};

export default connectToMongoDB;