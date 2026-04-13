import Ticket from "../models/ticket.js";

const getTicketsByType = async (req, res) => {
  try {
    const data = await Ticket.aggregate([
      {
        $group: {
          _id: "$type_id",
          count: { $sum: 1 },
          tickets: { $push: "$id" },
        },
      },
      {
        $lookup: {
          from: "types",
          localField: "_id",
          foreignField: "_id",
          as: "type_info",
        },
      },
      { $unwind: { path: "$type_info", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          type_id: "$type_info.id",
          type_name: "$type_info.type",
          count: 1,
          tickets: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketsByUser = async (req, res) => {
  try {
    const data = await Ticket.aggregate([
      {
        $group: {
          _id: "$created_by",
          count: { $sum: 1 },
          tickets: { $push: "$id" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user_info",
        },
      },
      { $unwind: { path: "$user_info", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          user_id: "$user_info.id",
          username: "$user_info.username",
          name: "$user_info.name",
          count: 1,
          tickets: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketsByStatus = async (req, res) => {
  try {
    const data = await Ticket.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          tickets: { $push: "$id" },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
          tickets: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTicketsByStatus, getTicketsByUser, getTicketsByType };
