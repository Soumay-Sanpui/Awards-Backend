import { ApiResponse } from "../utils/ApiResponse.js";
import { Award } from "../models/Award.model.js";
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } from "../../constants.js";
import { stripe } from "../utils/StripeInstance.util.js";
import cloudinary from "cloudinary";
import { MediaDeleter } from "../utils/MediaDeleter.util.js";

cloudinary.v2.config({
  cloud_name: 'dsmd5zmhq',
  api_key: '999139916259386',
  api_secret: 'Qc5dbYcSwAsFmAPcyL5KWDS50ng',
  secure: true,
});

// Add new Product
const addNewProduct = async (req, res) => {
    const { awardName, awardPrice, awardType, isAvailable, awardSample, samplePublicId, awardSize } = req.body;
    const data = { awardName, awardPrice, awardType, isAvailable, awardSample, samplePublicId, awardSize };

    try {
        const newProduct =  await Award.create(data);
        if (!newProduct) {
            return res.status(500).json({
                error: "Failed to create award",
                message: "Something went wrong while adding the award."
            });
        }

        return res.status(201).json(new ApiResponse(201, newProduct, "Award Added"));
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
            message: "Something went wrong while adding the award."
        });
    }
};

// View Product by ID
const viewSingleProduct = async (req,res) => {
    try{
        const { id } = req.params;
        const existingProduct = await Award.findById(id);
        if(existingProduct) {
            return res.json(new ApiResponse(200,existingProduct,"success"));
        }else {
            return res.status(404).json({
                error: "Product not found",
                message: "No Product found with the given ID"
            });
        }
    }catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to fetch product at the moment"
        });
    }
};

// View all Product controller
const viewMedia = async (req,res) => {
    try {
        const all_trophies = await Award.find();
        return res.json(new ApiResponse(200,all_trophies,"Data fetched success."));
    }catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Unable to fetch data at the moment.",
        });
    }
};

// Delete Product (by ID) controller
const deleteProduct = async (req, res) => {
    try {
        const { id, publicId } = req.body;
        const deletedProduct = await Award.findByIdAndDelete(id);
        if (deletedProduct) {
            return res.json(new ApiResponse(200, deletedProduct, "Product Deleted."));
        } else {
            return res.status(404).json({
                error: "Product not found",
                message: "No product found with the given ID.",
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to delete data at the moment.",
        });
    }
};

// Update Product (by ID) controller
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const updatedProduct = await Award.findByIdAndUpdate(id, updateFields, { new: true });
        if (updatedProduct) {
            return res.status(200).json(new ApiResponse(200, updatedProduct, "Product Updated."));
        } else {
            return res.status(404).json({
                error: "Product not found",
                message: "No product found with the given ID.",
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to update the product at the moment",
        });
    }
};

// Fetch Products by array of IDs
const getFromIds = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of IDs in the request body
        const products = await Award.find({ '_id': { $in: ids } });
        if (products.length > 0) {
            return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully."));
        } else {
            return res.status(404).json({
                error: "Products not found",
                message: "No products found with the given IDs."
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to fetch products at the moment."
        });
    }
};

// get the publishable key
const getSTPConfig = (req,res) => {
    // pass the publishable key to the frontend
    return res.status(200).send({publishableKey: STRIPE_PUBLISHABLE_KEY});
};

// generate the payment intent
const STcreatePayIntent = async (req, res) => {
    try {
        const { description, customerName, customerAddress } = req.body; 
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "inr",
            amount: 680, 
            description, 
            shipping: {
                name: customerName,
                address: {
                    line1: customerAddress.line1,
                    line2: customerAddress.line2,
                    city: customerAddress.city,
                    state: customerAddress.state,
                    postal_code: customerAddress.postal_code,
                    country: customerAddress.country,
                },
            },
            automatic_payment_methods: {
                enabled: true,
            }
        });

        if (paymentIntent) {
            return res.status(200).json({
                statusCode: 200,
                data: paymentIntent.client_secret,
                message: "Intent generated!"
            });
        } else {
            return res.status(500).json({
                message: "Payment Intent error during transaction"
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Payment Intent error during transaction"
        });
    }
}
export { addNewProduct, viewSingleProduct, viewMedia, deleteProduct, updateProduct, getSTPConfig, STcreatePayIntent, getFromIds};
