import User from "../models/user.js";
import Career from "../models/career.js";

const createUser = async (req, res) => {
  try {
    const data = req.body;

    if (data.id) {
      const existingId = await User.findOne({ id: data.id });
      if (existingId)
        return res.status(400).json({
          message: "El ID proporcionado ya existe, por favor utiliza otro.",
        });
    }

    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "El email o username ya están en uso" });

    if (data.career_id) {
      const careerDoc = await Career.findOne({ id: data.career_id });
      if (!careerDoc)
        return res
          .status(404)
          .json({ message: "La carrera proporcionada no existe." });
      data.career_id = careerDoc._id;
    }

    const newUser = new User(data);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  const { page = 1, limit = 10, sort = "created_at" } = req.query;
  try {
    const users = await User.find()
      .sort({ [sort]: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("career_id", "name");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id }).populate(
      "career_id",
      "name",
    );
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterUsers = async (req, res) => {
  const { name, email, career, rol } = req.query;
  const filter = {};
  if (name) filter.name = new RegExp(name, "i");
  if (email) filter.email = email;
  if (rol) filter.rol = rol;

  if (career) {
    const careerDoc = await Career.findOne({ id: career });
    if (careerDoc) filter.career_id = careerDoc._id;
    else filter.career_id = null;
  }

  try {
    const users = await User.find(filter).populate("career_id", "name");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      { active: req.body.active },
      { new: true },
    );
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const updates = req.body;
    const targetId = Number(req.params.id);
    if (updates.career_id) {
      const careerDoc = await Career.findOne({ id: updates.career_id });
      if (!careerDoc)
        return res
          .status(404)
          .json({ message: "La carrera proporcionada no existe." });
      updates.career_id = careerDoc._id;
    }
    const user = await User.findOneAndUpdate({ id: targetId }, updates, {
      new: true,
    });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne(
      { id: req.params.id }
    );
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createUser,
  getUsers,
  getUserById,
  filterUsers,
  updateStatus,
  editUser,
  deleteUser,
};
