import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  description: String,
  type_id: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
  status: { type: String, enum: ["open", "in_progress", "closed"] },
  priority: { type: String, enum: ["low", "medium", "high"] },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
