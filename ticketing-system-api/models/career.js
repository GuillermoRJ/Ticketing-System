import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: String,
  active: { type: Boolean, default: true },
});

const Career = mongoose.model("Career", CareerSchema);

export default Career;
