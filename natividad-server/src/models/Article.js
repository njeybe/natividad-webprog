import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    availability: {
      type: String,
      required: true,
      enum: ["in-stock", "pre-order", "limited"],
    },
    price: { type: Number, required: true, min: 0 },
    content: { type: [String], default: [] },
    category: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Article", articleSchema);
