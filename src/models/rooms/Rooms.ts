import mongoose from "mongoose";

const RoomsSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },

  price: {
    type: Number,
  },

  images: {
    type: String,
  },

  host_name: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Rooms = mongoose.models.rooms || mongoose.model("rooms", RoomsSchema);

export default Rooms;
