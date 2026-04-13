import Ticket from "../models/ticket.js";
import Ticket_Devs from "../models/ticket_devs.js";

const createTicket = async (req, res) => {
  try {
    const ticket = new Ticket({ ...req.body, created_by: req.user._id });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTickets = async (req, res) => {
  const { status, priority, type, user } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (type) filter.type_id = type;
  if (user) filter.created_by = user;

  try {
    const tickets = await Ticket.find(filter)
      .populate("type_id")
      .populate("created_by", "name email");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignTicket = async (req, res) => {
  try {
    const { ticket_id, user_id } = req.body;
    const assignment = new Ticket_Devs({ ticket_id, user_id });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketsByUser = async (req, res) => {
  try {
    const tickets = await Ticket.find({ created_by: req.params.id });
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
  if (type) filter.type_id = type;
  if (user) filter.created_by = user;

  try {
    const tickets = await Ticket.find(filter)
      .populate("type_id")
      .populate("created_by", "name email");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
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
