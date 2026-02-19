import mongoose from "mongoose";

const Items = new mongoose.Schema(
  {
    orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, required: true },
    itemCode: {
      type: String,
      required: true,
      unique: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Items", Items);
