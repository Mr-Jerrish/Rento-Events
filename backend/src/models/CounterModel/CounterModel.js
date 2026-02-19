import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, required: true },
  screenName: { type: String, required: true },
  prefix: { type: String, required: true },
  sequence: { type: Number, default: 0 },
});
counterSchema.index(
  { orgId: 1, branchId: 1, screenName: 1, prefix: 1 },
  { unique: true },
);

export default mongoose.model("Counter", counterSchema);
