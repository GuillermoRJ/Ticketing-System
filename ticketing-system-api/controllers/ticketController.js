import Ticket from "../models/ticket.js";
import Ticket_Devs from "../models/ticket_devs.js";
import Type from "../models/type.js";
import User from "../models/user.js";

const createTicket = async (req, res) => {
  try {
    const { id, title, description, type_id, priority } = req.body;

    if (id) {
      const existingId = await Ticket.findOne({ id });
      if (existingId)
        return res.status(400).json({ message: "El ID del ticket ya existe." });
    }

    let typeInternalId = type_id;
    if (type_id) {
      const typeDoc = await Type.findOne({ id: type_id });
      if (!typeDoc)
        return res
          .status(404)
          .json({ message: "Tipo de ticket no encontrado." });
      typeInternalId = typeDoc._id;
    }

    const ticket = new Ticket({
      id,
      title,
      description,
      type_id: typeInternalId,
      priority,
      created_by: req.user._id,
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("type_id", "type description")
      .populate("created_by", "name email");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ id: req.params.id })
      .populate("type_id", "type description")
      .populate("created_by", "name email");
    if (!ticket)
      return res.status(404).json({ message: "Ticket no encontrado" });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    if (req.body.type_id) {
      const typeDoc = await Type.findOne({ id: req.body.type_id });
      if (typeDoc) req.body.type_id = typeDoc._id;
    }

    const ticket = await Ticket.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
    );
    if (!ticket)
      return res.status(404).json({ message: "Ticket no encontrado" });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { id: req.params.id },
      { status: req.body.status },
      { new: true },
    );
    if (!ticket)
      return res.status(404).json({ message: "Ticket no encontrado" });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignTicket = async (req, res) => {
  try {
    const { ticket_id, user_id } = req.body;

    const ticketDoc = await Ticket.findOne({ id: ticket_id });
    const userDoc = await User.findOne({ id: user_id });

    if (!ticketDoc || !userDoc)
      return res
        .status(404)
        .json({ message: "Ticket o Usuario no encontrado" });

    const assignment = new Ticket_Devs({
      ticket_id: ticketDoc._id,
      user_id: userDoc._id,
    });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketsByUser = async (req, res) => {
  try {
    const targetUser = await User.findOne({ id: req.params.id });
    if (!targetUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const tickets = await Ticket.find({ created_by: targetUser._id }).populate(
      "type_id",
      "type description",
    );
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterTickets = async (req, res) => {
  const { status, priority, type, user } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  if (type) {
    const typeDoc = await Type.findOne({ id: type });
    if (typeDoc) filter.type_id = typeDoc._id;
  }
  if (user) {
    const userDoc = await User.findOne({ id: user });
    if (userDoc) filter.created_by = userDoc._id;
  }

  try {
    const tickets = await Ticket.find(filter)
      .populate("type_id", "type description")
      .populate("created_by", "name email");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({ id: req.params.id });
    if (!ticket)
      return res.status(404).json({ message: "Ticket no encontrado" });
    res.status(200).json({ message: "Ticket eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createTicket,
  getTickets,
  getTicketById,
  getTicketsByUser,
  updateTicket,
  assignTicket,
  changeStatus,
  filterTickets,
  deleteTicket,
};
