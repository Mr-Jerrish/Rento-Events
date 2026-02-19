import companyDetails from "../models/CompanyDetails.js";
import BranchDetails from "../models/BranchDetails.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../utils/commonResponse.js";

export const createCompanyDetails = asyncHandler(async (req, res) => {
  const {
    id,
    companyName,
    registrationNo,
    taxId,
    industry,
    establishedYear,
    email,
    mobileNo,
    address,
    city,
    state,
    country,
    status,
  } = req.body;

  // ---------------- UPDATE ----------------
  if (id) {
    const company = await companyDetails.findById(id);

    if (!company) {
      return sendErrorResponse(res, {
        message: "Company not found",
        statusCode: 404,
      });
    }

    company.companyName = companyName;
    company.registrationNo = registrationNo;
    company.taxId = taxId;
    company.industry = industry;
    company.establishedYear = establishedYear;
    company.email = email;
    company.mobileNo = mobileNo;
    company.address = address;
    company.city = city;
    company.state = state;
    company.country = country;
    company.status = status;

    // ✅ Logo only if new file uploaded
    if (req.file) {
      company.logo = req.file.filename;
    }

    await company.save();

    return sendSuccessResponse(res, {
      data: company,
      message: "Company updated successfully",
    });
  }

  // ---------------- CREATE ----------------
  if (!req.file) {
    return sendErrorResponse(res, {
      message: "Please upload a logo",
      statusCode: 400,
    });
  }

  const company = await companyDetails.create({
    companyName,
    registrationNo,
    taxId,
    industry,
    establishedYear,
    email,
    mobileNo,
    address,
    city,
    state,
    country,
    status,
    logo: req.file.filename,
  });

  sendSuccessResponse(res, {
    data: company,
    message: "Company created successfully",
  });
});

export const getALLCompanyDetails = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const totalCount = await companyDetails.countDocuments();
  const activeCount = await companyDetails.countDocuments({ status: "Active" });
  const inactiveCount = await companyDetails.countDocuments({
    status: "Inactive",
  });

  const companyDetailsAll = await companyDetails
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  sendSuccessResponse(res, {
    data: {
      list: companyDetailsAll,
      totalCount,
      activeCount,
      inactiveCount,
    },
    message: "Company details fetched successfully",
  });
});

export const getCompanyDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const company = await companyDetails.findById(id);

  if (!company) {
    return sendErrorResponse(res, {
      message: "Company not found",
      statusCode: 404,
    });
  }

  sendSuccessResponse(res, {
    message: "Company details fetched successfully",
    data: company,
  });
});

// branchscreen
export const createBranchDetails = asyncHandler(async (req, res) => {
  const { orgId } = req.query;
  const {
    id,
    branchName,
    branchCode,
    managerName,
    email,
    mobileNo,
    address,
    city,
    state,
    country,
    status,
  } = req.body;

  // ---------------- UPDATE ----------------
  if (id) {
    const branch = await BranchDetails.findById(id);

    if (!branch) {
      return sendErrorResponse(res, {
        message: "Branch not found",
        statusCode: 404,
      });
    }

    branch.branchName = branchName;
    branch.branchCode = branchCode;
    branch.managerName = managerName;
    branch.email = email;
    branch.mobileNo = mobileNo;
    branch.address = address;
    branch.city = city;
    branch.state = state;
    branch.country = country;
    branch.status = status;
    branch.orgId = orgId;

    await branch.save();

    return sendSuccessResponse(res, {
      statusCode: 200,
      message: "Branch updated successfully",
      data: branch,
    });
  }

  // ---------------- CREATE ----------------
  const branch = await BranchDetails.create({
    branchName,
    branchCode,
    managerName,
    email,
    mobileNo,
    address,
    city,
    state,
    country,
    status,
    orgId,
  });

  return sendSuccessResponse(res, {
    statusCode: 200,
    message: "Branch created successfully",
    data: branch,
  });
});

export const getAllBranchDetails = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const totalCount = await BranchDetails.countDocuments();
  const activeCount = await BranchDetails.countDocuments({ status: "Active" });
  const inactiveCount = await BranchDetails.countDocuments({
    status: "Inactive",
  });

  const branchDetailsAll = await BranchDetails.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  sendSuccessResponse(res, {
    data: {
      list: branchDetailsAll,
      totalCount,
      activeCount,
      inactiveCount,
    },
    message: "Branch details fetched successfully",
  });
});

export const getBranchDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const branch = await BranchDetails.findById(id);

  if (!branch) {
    return sendErrorResponse(res, {
      message: "Branch not found",
      statusCode: 404,
    });
  }

  sendSuccessResponse(res, {
    message: "Branch details fetched successfully",
    data: branch,
  });
});

// dropdown for global parameter
export const getCompanyDetails = asyncHandler(async (req, res) => {
  const companyDetail = await companyDetails.find();
  sendSuccessResponse(res, {
    message: "Company details fetched successfully",
    data: companyDetail,
  });
});

// dropdown for global parameter
export const getBranchDetails = asyncHandler(async (req, res) => {
  const branchDetails = await BranchDetails.find();
  sendSuccessResponse(res, {
    message: "Branch details fetched successfully",
    data: branchDetails,
  });
});

// Drop down api
export const cities = [
  { city: "Mumbai", state: "Maharashtra", country: "India" },
  { city: "Delhi", state: "Delhi", country: "India" },
  { city: "Bangalore", state: "Karnataka", country: "India" },
  { city: "Hyderabad", state: "Telangana", country: "India" },
  { city: "Chennai", state: "Tamil Nadu", country: "India" },
  { city: "Pune", state: "Maharashtra", country: "India" },
  { city: "Ahmedabad", state: "Gujarat", country: "India" },
  { city: "Kolkata", state: "West Bengal", country: "India" },
  { city: "Surat", state: "Gujarat", country: "India" },
  { city: "Jaipur", state: "Rajasthan", country: "India" },
  { city: "Coimbatore", state: "Tamil Nadu", country: "India" },
  { city: "Madurai", state: "Tamil Nadu", country: "India" },
  { city: "Noida", state: "Uttar Pradesh", country: "India" },
  { city: "Gurgaon", state: "Haryana", country: "India" },
  { city: "Lucknow", state: "Uttar Pradesh", country: "India" },
];
export const getCities = (req, res) => {
  res.json(cities);
};
