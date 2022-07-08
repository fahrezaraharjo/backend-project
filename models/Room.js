const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    maxPeople: {
      type: Number,
      // required: true,
    },
    desc: {
      type: String,
      // required: true,
    },
    roomNumbers: String,
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' },

  },
  // { timestamps: true }
);

module.exports = mongoose.model("Rooms", RoomSchema);
