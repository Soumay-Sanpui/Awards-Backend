import { Router } from "express";
import {
    addNewUser,
    viewAllUsers,
    viewSingleUser,
    viewUserWithName,
    loginUser,
    logoutUser,
    deleteUser,
    updateUser,
    getPassKey,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// User routes
router.route("/user/register").post(addNewUser);
router.route("/user/login").post(loginUser);
router.route("/user/viewUser/:id").get(viewSingleUser);
router.route("/user/search/:username").get(viewUserWithName);
router.route("/user/logout").get(logoutUser);

// Admin routes
router.route("/admin/viewUsers").get(authMiddleware,viewAllUsers);
router.route("/admin/deleteUser/:id").delete(authMiddleware,deleteUser);
router.route("/admin/updateUser/:id").post(updateUser);
router.route("/admin/getPassKey").get(authMiddleware,getPassKey);

export default router;
