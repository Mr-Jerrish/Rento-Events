import mongoose from "mongoose";

const CompanyDetailsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    registrationNo: {
      type: String,
      required: true,
    },
    taxId: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
    },
    establishedYear: {
      type: String,
    },
    email: {
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
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("companyDetails", CompanyDetailsSchema);
