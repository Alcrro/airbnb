import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
  productId: {},
  reviews: {
    type: [],
  },
});

const Reviews =
  mongoose.models.reviews || mongoose.model("reviews", ReviewsSchema);

export default Reviews;
