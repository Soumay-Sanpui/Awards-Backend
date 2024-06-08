import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  orgName: {
    type: String,
    unique: false,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Award',
    required: false
  }]
}, {
  timestamps: true
});

userSchema.pre("save",async function(next){
  if(!this.isModified('password')) {
    return next();
  }
  try{
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }catch(error) {
    next(error);
  }
});
export const User = mongoose.models.User || mongoose.model('User', userSchema);
