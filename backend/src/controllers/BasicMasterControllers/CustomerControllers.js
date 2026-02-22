import Customer from "../../models/BasicMaster/Customer.js";
import Counter from "../../models/CounterModel/CounterModel.js";
import { getCurrentCode } from "../../utils/generateCode.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../utils/commonResponse.js";

// create and update

export const createCustomer = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;
  const {
    id,
    customerName,
    mobileNo,
    address,
    city,
    aadharNo,
    refName,
    refMobileNo,
    status,
  } = req.body;

  if (id) {
    const customer = await Customer.findById(id);
    if (!customer) {
      return sendErrorResponse(res, {
        message: "Customer not found",
        statusCode: 404,
      });
    }
    customer.customerName = customerName;
    customer.mobileNo = mobileNo;
    customer.address = address;
    customer.city = city;
    customer.aadharNo = aadharNo;
    customer.refName = refName;
    customer.refMobileNo = refMobileNo;
    customer.status = status;

    await customer.save();
    return sendSuccessResponse(res, {
      message: "Customer updated successfully",
      statusCode: 200,
      data: customer,
    });
  }

  // create

  const prefix = "CUST";
  let counter = await Counter.findOne({
    orgId,
    branchId,
    screenName: "CUSTOMER",
    prefix,
  });
  const nextSequence = counter ? counter.sequence + 1 : 1;
  const padded = nextSequence.toString().padStart(4, "0");
  const newCode = `${prefix}${padded}`;

  const customer = await Customer.create({
    orgId,
    branchId,
    customerCode: newCode,
    customerName,
    mobileNo,
    address,
    city,
    aadharNo,
    refName,
    refMobileNo,
    status,
  });
  await Counter.findOneAndUpdate(
    { orgId, branchId, screenName: "CUSTOMER", prefix },
    { $set: { sequence: nextSequence } },
    { upsert: true },
  );
  return sendSuccessResponse(res, {
    message: "Customer created successfully",
    statusCode: 200,
    data: customer,
  });
});

// getAll
export const getAllCustomer = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const filter = { orgId, branchId };

  const totalCount = await Customer.countDocuments(filter);
  const activeCount = await Customer.countDocuments({
    ...filter,
    status: "Active",
  });
  const inactiveCount = await Customer.countDocuments({
    ...filter,
    status: "Inactive",
  });

  const customerDetailsAll = await Customer.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  sendSuccessResponse(res, {
    data: {
      list: customerDetailsAll,
      totalCount,
      activeCount,
      inactiveCount,
    },
    message: "Cutomer fetch successfully",
  });
});

// get by id
export const getCustomerById = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;
  const { id } = req.params;

  const customer = await Customer.findOne({
    _id: id,
    orgId,
    branchId,
  });

  if (!customer) {
    return sendErrorResponse(res, {
      message: "Customer not found",
      statusCode: 404,
    });
  }

  return sendSuccessResponse(res, {
    message: "Customer fetch successfully",
    statusCode: 200,
    data: customer,
  });
});

// auot generated customer code
export const getCutomerCode = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;
  const code = await getCurrentCode(orgId, branchId, "CUSTOMER", "CUST");
  return sendSuccessResponse(res, {
    message: "Current Code",
    statusCode: 200,
    data: code,
  });
});
