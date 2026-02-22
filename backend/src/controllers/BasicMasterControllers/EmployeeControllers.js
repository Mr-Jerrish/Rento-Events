import Employee from "../../models/BasicMaster/Employee.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../utils/commonResponse.js";
import { getCurrentCode } from "../../utils/generateCode.js";
import Counter from "../../models/CounterModel/CounterModel.js";

// auto generated employee code

export const generateEmployeeCode = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;

  const code = await getCurrentCode(orgId, branchId, "EMPLOYEE", "EMP");
  return sendSuccessResponse(res, {
    message: "Current Code",
    statusCode: 200,
    data: code,
  });
});

// create & update

export const createEmployee = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;
  const {
    id,
    employeeName,
    employeeEmail,
    mobileNo,
    address,
    city,
    role,
    aadharNo,
    joinDate,
    salary,
    status,
    bankName,
    accountName,
    accountNo,
    ifscCode,
    branchName,
  } = req.body;
  if (id) {
    const employee = await Employee.findById(id);
    if (!employee) {
      return sendErrorResponse(res, {
        message: "Employee not found",
        statusCode: 404,
      });
    }

    employee.employeeName = employeeName;
    employee.employeeEmail = employeeEmail;
    employee.mobileNo = mobileNo;
    employee.address = address;
    employee.city = city;
    employee.role = role;
    employee.aadharNo = aadharNo;
    employee.joinDate = joinDate;
    employee.salary = salary;
    employee.status = status;
    employee.bankName = bankName;
    employee.accountName = accountName;
    employee.accountNo = accountNo;
    employee.ifscCode = ifscCode;
    employee.branchName = branchName;

    await employee.save();

    return sendSuccessResponse(res, {
      message: "Employee updated successfully",
      statusCode: 200,
      data: employee,
    });
  }

  const prefix = "EMP";
  let counter = await Counter.findOne({
    orgId,
    branchId,
    screenName: "EMPLOYEE",
    prefix,
  });

  const nextSequence = counter ? counter.sequence + 1 : 1;
  const padded = nextSequence.toString().padStart(4, "0");
  const newCode = `${prefix}${padded}`;

  const employee = await Employee.create({
    orgId,
    branchId,
    employeeCode: newCode,
    employeeName,
    employeeEmail,
    mobileNo,
    address,
    city,
    role,
    aadharNo,
    joinDate,
    salary,
    status,
    bankName,
    accountName,
    accountNo,
    ifscCode,
    branchName,
  });

  await Counter.findOneAndUpdate(
    { orgId, branchId, screenName: "EMPLOYEE", prefix },
    { $set: { sequence: nextSequence } },
    { upsert: true },
  );

  return sendSuccessResponse(res, {
    message: "Employee created successfully",
    statusCode: 200,
    data: employee,
  });
});

// getByID

export const getEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { orgId, branchId } = req.query;

  const employee = await Employee.findOne({
    _id: id,
    orgId,
    branchId,
  });

  if (!employee) {
    return sendErrorResponse(res, {
      message: "Employee not found",
      statusCode: 404,
    });
  }

  return sendSuccessResponse(res, {
    message: "Employee fetched successfully",
    statusCode: 200,
    data: employee,
  });
});

// GetAll

export const getAllEmployee = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const filter = { orgId, branchId };

  const totalCount = await Employee.countDocuments(filter);
  const activeCount = await Employee.countDocuments({
    ...filter,
    status: "Active",
  });

  const inactiveCount = await Employee.countDocuments({
    ...filter,
    status: "Inactive",
  });

  const employeeDetailsAll = await Employee.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  sendSuccessResponse(res, {
    data: {
      list: employeeDetailsAll,
      totalCount,
      activeCount,
      inactiveCount,
    },
    message: "Employee fetched successfully",
    statusCode: 200,
  });
});
