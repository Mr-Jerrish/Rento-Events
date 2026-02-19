import express from "express";
import {
  createItem,
  getGeneratedCode,
  getAllItems,
  getItemById,
} from "../../controllers/BasicMasterControllers/ItemControllers.js";

const router = express.Router();
// Auto Generated for Item code
router.get("/generateCode", getGeneratedCode);
// create
router.put("/createItem", createItem);
// getAll
router.get("/getAllItems", getAllItems);
// getbyId
router.get("/getItemById/:id", getItemById);

export default router;
