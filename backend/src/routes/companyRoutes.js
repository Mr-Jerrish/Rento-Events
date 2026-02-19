import express from "express";
import {
  getCities,
  createCompanyDetails,
  getALLCompanyDetails,
  getCompanyDetailsById,
  createBranchDetails,
  getAllBranchDetails,
  getBranchDetailsById,
  // dropdown
  getCompanyDetails,
  getBranchDetails,
} from "../controllers/companyControllers.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// dropdown for global details
router.get("/cities", getCities);
router.get("/getCompanyDetails", getCompanyDetails);
router.get("/getBranchDetails", getBranchDetails);
// company Details
router.put(
  "/createCompanyDetails",
  upload.single("logo"),
  createCompanyDetails,
);
router.get("/getAllCompanyDetails", getALLCompanyDetails);
router.get("/getCompanyDetailsById/:id", getCompanyDetailsById);

// Branch Details
router.put("/branch", createBranchDetails);
router.get("/getAllBranchDetails", getAllBranchDetails);
router.get("/getBranchDetailsById/:id", getBranchDetailsById);

export default router;
