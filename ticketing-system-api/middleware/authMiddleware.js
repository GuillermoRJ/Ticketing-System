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
    if (user.failed_attempts >= 5) {
      return res
        .status(401)
        .json({ message: "Usuario bloqueado por múltiples intentos fallidos" });
    }

    req.user = user; // Guardamos el usuario en la request para usarlo en el controlador
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export default authMiddleware;
