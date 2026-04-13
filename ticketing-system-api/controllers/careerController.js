import Career from "../models/career.js";

const createCareer = async (req, res) => {
  try {
    const { id, name } = req.body;
    const newCareer = new Career({ id, name });
    await newCareer.save();
    res.status(201).json(newCareer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCareers = async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterCareers = async (req, res) => {
  const { name, active } = req.query;
  const filter = {};
  if (name) filter.name = new RegExp(name, "i");
  if (active) filter.active = active === "true";

  try {
    const careers = await Career.find(filter);
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCareer = async (req, res) => {
  try {
    const updated = await Career.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
    );
    if (!updated)
      return res.status(404).json({ message: "Carrera no encontrada" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const deleted = await Career.findOneAndUpdate(
      { id: req.params.id },
      { active: false },
      { new: true },
    );
    if (!deleted)
      return res.status(404).json({ message: "Carrera no encontrada" });
    res.status(200).json({ message: "Carrera desactivada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createCareer, getCareers, filterCareers, updateCareer, deleteCareer };
