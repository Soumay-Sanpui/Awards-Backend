import mongoose from "mongoose";

const AwardSchema = new mongoose.Schema({
    awardName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },

    awardType: {
      type: String,
      lowercase: true,
      enum: ["trophy", "medal", "cup", "badge", "plate", "momento"], 
      default: "trophy",
      required: true,
    },

    awardPrice: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    awardSample: {
        type: String,
        required: true,
    },
    samplePublicId: {
        type: String,
        required: true,
    },
    awardSize: {
        type: String,
        required: true,
    }
},{timestamps: true});

export const Award = mongoose.models.Award || new mongoose.model("Award",AwardSchema);
