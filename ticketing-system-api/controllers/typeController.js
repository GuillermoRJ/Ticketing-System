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
    const { id, type, description, area } = req.body;
    const newType = new Type({ id, type, description, area });
    await newType.save();
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateType = async (req, res) => {
  try {
    const updated = await Type.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Tipo no encontrado" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteType = async (req, res) => {
  try {
    const deleted = await Type.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Tipo no encontrado" });
    res.status(200).json({ message: "Tipo eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Type.find().select("id type -_id");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTypes, createType, updateType, deleteType, getCategories };
