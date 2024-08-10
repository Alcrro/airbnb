import mongoose from "mongoose";

const PropertyTypeSchema = new mongoose.Schema({
  property_type: {
    type: String,
  },
});

const PropertyTypes =
  mongoose.models.propertyTypes ||
  mongoose.model("propertyTypes", PropertyTypeSchema);

export default PropertyTypes;
