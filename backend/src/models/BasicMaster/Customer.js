import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    customerCode: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    aadharNo: {
      type: String,
    },
    refName: {
      type: String,
    },
    refMobileNo: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
