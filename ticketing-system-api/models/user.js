import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  last_name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  career_id: { type: mongoose.Schema.Types.ObjectId, ref: "Career" },
  active: { type: Boolean, default: true },
  password: String,
  rol: { type: String, enum: ["admin", "user", "dev"] },
  failed_attempts: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

export default User;
