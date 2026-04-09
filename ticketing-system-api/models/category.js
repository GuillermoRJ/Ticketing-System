import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  description: String,
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
K