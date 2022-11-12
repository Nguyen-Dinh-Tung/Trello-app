import mongoose, { Schema } from "mongoose";

const broadSchema = new mongoose.Schema({
  useId: Array,
  title: String,
  mode: String,
  columns: Object,
  columnOrder: Array,
});

const BroadModels = mongoose.model("broad", broadSchema);

export default BroadModels;
