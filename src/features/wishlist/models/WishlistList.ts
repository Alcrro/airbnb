import mongoose from "mongoose";

const wishlistListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  properties: { type: [String], default: [] },
  coverImage: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const WishlistList =
  mongoose.models.WishlistList || mongoose.model("WishlistList", wishlistListSchema);
export default WishlistList;
