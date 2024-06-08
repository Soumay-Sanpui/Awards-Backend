// index.js (server.js -> Entry Point)
import { app } from "./app.js"
import connectDB from "./src/db/index.js"
import dotenv from "dotenv"

dotenv.config({path: './env'})
connectDB().then(()=> {

    app.listen(process.env.PORT || 8000,()=> {
        console.log(`Server is running at: http://localhost:8000`)
    })

    app.on("error",(error) => {
        console.log("ERROR: ",error);
        throw error
    })
}).catch((err)=>{
    console.log("MONGO DB error failed.");
})