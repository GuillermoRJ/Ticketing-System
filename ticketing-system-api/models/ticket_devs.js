import mongoose from "mongoose";

const Ticket_DevsSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  created_at: { type: Date, default: Date.now },
});

const Ticket_Devs = mongoose.model("Ticket_Devs", Ticket_DevsSchema);

export default Ticket_Devs;
