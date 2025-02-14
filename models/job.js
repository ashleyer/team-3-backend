import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    saleType: String,
    date: String,
    priceBook: {
      type: String,
      enum: [2, 6],
      default: 6
    },
    loan:{type: String, default: true},
    payFull: {type: String, default: true},
    product: {
      type: String,
      enum: ["Stove", "Filter", "Entrepreneur Filter"],
      default: "Filter"
    },
    customer: {
      name: String,
      address: String,
      phoneNumber: String,
      deposit: String,
      peopleInHouse: String,
    },
    quantity: String,
    history:{
        type: String, 
        enum: [ "Because I don't like the taste of chlorine", "Because my children are getting sick", "Because the product is cheaper than I used to" ]
      },
  },

  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export { Job };
