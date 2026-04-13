import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res.status(401).json({
      message: "Faltan credenciales en los headers (username y password)",
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    if (!user.active) {
      return res.status(401).json({ message: "El usuario está inactivo" });
    }
   

    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export default authMiddleware;
