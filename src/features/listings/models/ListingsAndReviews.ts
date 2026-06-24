import mongoose from "mongoose";

const ListingsAndReviewsSchema = new mongoose.Schema({}, { strict: false });

const ListingsAndReviews =
  mongoose.models.listingsAndReviews ||
  mongoose.model("listingsAndReviews", ListingsAndReviewsSchema, "listingsAndReviews");

export default ListingsAndReviews;
