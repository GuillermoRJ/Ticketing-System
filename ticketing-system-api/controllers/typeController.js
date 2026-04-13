import Type from "../models/type.js";
import Category from "../models/category.js";

const getTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createType = async (req, res) => {
  try {
    const newType = new Type(req.body);
    await newType.save();
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateType = async (req, res) => {
  try {
    const updated = await Type.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteType = async (req, res) => {
  try {
    await Type.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tipo eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTypes, createType, updateType, deleteType, getCategories };
