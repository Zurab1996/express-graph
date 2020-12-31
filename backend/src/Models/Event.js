const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: new Schema({
      name: {
        type: String,
        required: true,
      },
      lat: {
        type: String,
      },
      lang: {
        type: String,
        required: true,
      },
    }),
    ticketQuantity: {
      type: Number,
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    active: {
      type: Boolean,
      default: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
