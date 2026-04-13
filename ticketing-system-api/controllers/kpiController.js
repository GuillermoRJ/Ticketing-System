import Ticket from "../models/ticket.js";

const getTicketsByStatus = async (req, res) => {
  try {
    const data = await Ticket.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketsByUser = async (req, res) => {
  try {
    const data = await Ticket.aggregate([
      { $group: { _id: "$created_by", count: { $sum: 1 } } },
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
          _id: 1,
          count: 1,
          username: "$user_info.username",
          name: "$user_info.name",
          email: "$user_info.email",
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTicketsByStatus, getTicketsByUser };
