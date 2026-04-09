import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  type: String,
  description: String,
  area: String,
});

const Type = mongoose.model("Type", TypeSchema);

export default Type;
