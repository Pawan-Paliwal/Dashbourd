import mongoose from "mongoose";
import User from "../model/User.js";
const ObjectID = mongoose.ObjectID;
import Transaction from "../model/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const userWithStas = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectID(id) } },
      {
        $lookup: {
          from: "affiliatestats", //graab the data form this Model
          localField: "_id", //use Id feild form there
          foreignField: "userId", //compare the key with userId
          as: "affiliateStats", // use as Affiliatestat
        },
      },
      { $unwind: "$affiliateStats" },
    ]);
    const salesTransactions = await Promise.all(
      userWithStas[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const FilterSalesTransactions = salesTransactions.filter((transaction) => {
      transaction !== null;
    });

    res
      .status(200)
      .json({ user: userWithStas[0], sales: FilterSalesTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
