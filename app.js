import express from "express";
import cors from "cors";
import ProductRoute from "./src/routes/product.route.js";
import UserRoute from "./src/routes/user.route.js";
import {BASE_PUBLIC_API_URL} from "./constants.js";
import { ApiResponse } from "./src/utils/ApiResponse.js";

const app = express();

app.use(cors({
    credentials: true,
    origin: "*"
}));

/* Middleware Configuration */
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

/* Global Route (Entry) */
app.get("/",(req,res)=>{
  return res.status(200).json(new ApiResponse(200, {message:"working fine"}, "Server Up and Running."));
});

/* API ROUTES */
app.use(BASE_PUBLIC_API_URL, ProductRoute);
app.use(BASE_PUBLIC_API_URL,UserRoute);

export { app };
