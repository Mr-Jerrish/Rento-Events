import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    employeeCode: {
      type: String,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    employeeEmail: {
      type: String,
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
    role: {
      type: String,
      required: true,
    },
    aadharNo: {
      type: String,
      required: true,
    },
    joinDate: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountNo: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Employee", EmployeeSchema);
