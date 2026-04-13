import User from "../models/user.js";

const createUser = async (req, res) => {
  try {
    const data = req.body;
    if (Object.keys(data).length < 6)
      return res.status(400).json({ message: "Se requieren mínimo 6 campos" });

    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "El email o username ya están en uso" });

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
      .skip((page - 1) * limit);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "No encontrado" });
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
  if (career) filter.career_id = career;
  if (rol) filter.rol = rol;

  try {
    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { active: req.body.active },
      { new: true },
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const fields = Object.keys(req.body);
    if (fields.length > 5)
      return res
        .status(400)
        .json({ message: "Máximo 5 campos permitidos para actualizar" });

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Eliminación lógica
    await User.findByIdAndUpdate(req.params.id, { active: false });
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  filterUsers,
  updateStatus,
  editUser,
  deleteUser,
};
