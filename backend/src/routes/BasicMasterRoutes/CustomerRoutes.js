import express from "express";
import {
  getCutomerCode,
  createCustomer,
  getCustomerById,
  getAllCustomer,
} from "../../controllers/BasicMasterControllers/CustomerControllers.js";

const router = express.Router();
// Auto Generated for Customer code
router.get("/getCustomerCode", getCutomerCode);
// create
router.put("/createCustomer", createCustomer);
// get by id
router.get("/getCustomerById/:id", getCustomerById);
// get all
router.get("/getAllCustomer", getAllCustomer);

export default router;
