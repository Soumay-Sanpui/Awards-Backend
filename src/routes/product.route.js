import { Router } from "express";
import  { addNewProduct, 
    viewSingleProduct, 
    viewMedia, 
    deleteProduct, 
    updateProduct, 
    getSTPConfig, 
    STcreatePayIntent 
} from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

/* ADMIN ROUTES */
router.route("/admin/addProduct").post(authMiddleware,addNewProduct);
router.route("/admin/deleteMedia/:id").delete(deleteProduct);
router.route("/admin/updateMedia/:id").patch(updateProduct);

/* USER ROUTES */
router.route("/viewMedia/:id").get(viewSingleProduct);
router.route("/viewMedia").get(viewMedia);
router.route("/prConfig").get(getSTPConfig);
router.route("/cpi").post(STcreatePayIntent);
export default router;
