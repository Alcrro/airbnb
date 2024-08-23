import mongoose from "mongoose";

const CountryFilterSchema = new mongoose.Schema({
  uniqueValues: {
    type: [],
  },
});

const CountryFilter =
  mongoose.models.CountryFilter ||
  mongoose.model("CountryFilter", CountryFilterSchema);

export default CountryFilter;
