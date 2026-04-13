import User from "../models/user.js";

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado." });

    if (user.failed_attempts >= 5) {
      return res.status(401).json({
        message: "Cuenta bloqueada temporalmente por seguridad.",
      });
    }

    if (user.password !== password) {
      user.failed_attempts += 1;
      await user.save();
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    user.failed_attempts = 0;
    await user.save();
    res.status(200).json({
      message: "Login exitoso.",
      user: { username: user.username, rol: user.rol },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

export { login, getProfile };
