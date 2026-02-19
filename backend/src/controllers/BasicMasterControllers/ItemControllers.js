import Items from "../../models/BasicMaster/Item.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../utils/commonResponse.js";
import { getCurrentCode } from "../../utils/generateCode.js";
import Counter from "../../models/CounterModel/CounterModel.js";

// create & update
export const createItem = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;
  const { id, itemName, itemType, category, qty, rent, status } = req.body;

  if (id) {
    const item = await Items.findById(id);

    if (!item) {
      return sendErrorResponse(res, {
        message: "Item not found",
        statusCode: 404,
      });
    }

    item.itemName = itemName;
    item.itemType = itemType;
    item.category = category;
    item.qty = qty;
    item.rent = rent;
    item.status = status;

    await item.save();

    return sendSuccessResponse(res, {
      message: "Item updated successfully",
      statusCode: 200,
      data: item,
    });
  }

  const prefix = "IT";
  let counter = await Counter.findOne({
    orgId,
    branchId,
    screenName: "ITEM",
    prefix,
  });

  const nextSequence = counter ? counter.sequence + 1 : 1;
  const padded = nextSequence.toString().padStart(4, "0");
  const newCode = `${prefix}${padded}`;

  const item = await Items.create({
    orgId,
    branchId,
    itemCode: newCode,
    itemName,
    itemType,
    category,
    qty,
    rent,
    status,
  });

  await Counter.findOneAndUpdate(
    { orgId, branchId, screenName: "ITEM", prefix },
    { $set: { sequence: nextSequence } },
    { upsert: true },
  );

  return sendSuccessResponse(res, {
    message: "Item created successfully",
    statusCode: 200,
    data: item,
  });
});

// getAll
export const getAllItems = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  // ✅ Filter by org & branch
  const filter = { orgId, branchId };

  const totalCount = await Items.countDocuments(filter);

  const activeCount = await Items.countDocuments({
    ...filter,
    status: "Active",
  });

  const inactiveCount = await Items.countDocuments({
    ...filter,
    status: "Inactive",
  });

  const itemDetailsAll = await Items.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  sendSuccessResponse(res, {
    data: {
      list: itemDetailsAll,
      totalCount,
      activeCount,
      inactiveCount,
    },
    message: "Item fetch successfully",
  });
});

// getbyId
export const getItemById = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;
  const { id } = req.params;

  const item = await Items.findOne({
    _id: id,
    orgId,
    branchId,
  });

  if (!item) {
    return sendErrorResponse(res, {
      message: "Item not found",
      statusCode: 404,
    });
  }

  return sendSuccessResponse(res, {
    message: "Item fetch successfully",
    statusCode: 200,
    data: item,
  });
});

// auto generate itemcode
export const getGeneratedCode = asyncHandler(async (req, res) => {
  const { orgId, branchId } = req.query;

  const code = await getCurrentCode(orgId, branchId, "ITEM", "IT");

  return sendSuccessResponse(res, {
    message: "Current code",
    statusCode: 200,
    data: code,
  });
});
