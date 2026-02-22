import express from "express";
import {
  generateEmployeeCode,
  createEmployee,
  getEmployeeById,
  getAllEmployee,
} from "../../controllers/BasicMasterControllers/EmployeeControllers.js";

const router = express.Router();

// Auto Generated for Employee code

router.get("/getEmployeeCode", generateEmployeeCode);
router.put("/createEmployee", createEmployee);
router.get("/getEmployeeById/:id", getEmployeeById);
router.get("/getAllEmployee", getAllEmployee);

export default router;
