import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET_PUBLIC } from "../../constants.js";

// View all users
const viewAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password');
        if (allUsers.length > 0) {
            return res.status(200).json(new ApiResponse(200, allUsers, "All users fetched."));
        } else {
            return res.status(404).json({
                error: "No users in the database",
                message: "Add new users to view them here."
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to fetch users at the moment",
        });
    }
};

// View User using ID
const viewSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const existingUser = await User.findById(id).select('-password');
        if (existingUser) {
            return res.status(200).json(new ApiResponse(200, existingUser, "User fetched."));
        } else {
            return res.status(404).json({
                error: "No user found",
                message: "No existing user with the given ID."
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to fetch user at the moment"
        });
    }
};

// View User using username
const viewUserWithName = async (req, res) => {
    try {
        const { username } = req.params;
        const existingUser = await User.findOne({ username }).select('-password');
        if (existingUser) {
            return res.status(200).json(new ApiResponse(200, existingUser, "User fetched."));
        } else {
            return res.status(404).json({
                error: "No user found",
                message: "No existing user with the given username."
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to fetch user at the moment"
        });
    }
};

// Add New user (register)
const addNewUser = async (req, res) => {
    try {
        const { fullName, username, orgName, email, password, phoneNumber, role, orders } = req.body;

        const newUserData = { 
            fullName, 
            username, 
            orgName, 
            email, 
            password, 
            phoneNumber, 
            role, 
            orders 
        };

        const newUser = await User.create(newUserData);

        if (newUser) {
            return res.status(201).json(new ApiResponse(201, newUser, "New User Created."));
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to create new users at the moment",
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (!existingUser) {
            return res.status(401).json({
                error: "Invalid credentials",
                message: "Username or email is incorrect."
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid credentials",
                message: "Password is incorrect."
            });
        }

        const token = jwt.sign(
            { userId: existingUser._id, username: existingUser.username, role: existingUser.role },
            JWT_SECRET_PUBLIC,
            { expiresIn: '30m' }
        );

        return res.status(200).json({
            token,
            user: {
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role
            },
            message: "Login success!"
        });

    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to login at the moment",
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);
        if (deleteUser) {
            return res.status(200).json(new ApiResponse(200, deleteUser, "User deleted."));
        } else {
            return res.status(404).json({
                error: "Unable to delete user",
                message: "No user with the given ID found"
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to delete the user at the moment"
        });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });

        if (updatedUser) {
            return res.status(200).json(new ApiResponse(200, updatedUser, "User details updated successfully."));
        } else {
            return res.status(404).json({
                error: "Unknown user!",
                message: "No user with the given ID found"
            });
        }

    } catch (e) {
        return res.status(500).json({
            error: e.message,
            message: "Unable to update user details at the moment"
        });
    }
};

// Logout user
const logoutUser = async (req, res) => {
    try {
        // Implement token invalidation if required
        return res.status(200).json(new ApiResponse(200, null, "User logged out successfully."));
    } catch (e) {
        return res.status(500).json(new ApiResponse(500, null, "Unable to logout user at the moment", e.message));
    }
};

// Get PassKey for admin
const getPassKey = async (req, res) => {
    const length = 32;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let passKey = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        passKey += chars[randomIndex];
    }
    return res.status(200).json(new ApiResponse(200, passKey, "Pass key generated successfully"));
};

export { viewAllUsers, addNewUser, loginUser, viewSingleUser, viewUserWithName, deleteUser, logoutUser, getPassKey, updateUser };

