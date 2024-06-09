const { Op } = require("sequelize");
const { Settlement, User } = require("../models");
const { notifyUsers } = require("../socket");
const createSettlement = async (req, res) => {
  const { amount, toUserId } = req.body;

  try {
    const toUser = await User.findByPk(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const settlement = await Settlement.create({
      amount,
      status: "submitted",
      fromUserId: req.user.id,
      toUserId,
      lastUpdatedBy: req.user.id,
    });

    res.status(201).json(settlement);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateSettlement = async (req, res) => {
  const { settlementId, amount, status } = req.body;

  if (amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be greater than zero" });
  }

  try {
    const settlement = await Settlement.findByPk(settlementId);

    if (!settlement) {
      return res.status(404).json({ message: "Settlement not found" });
    }

    if (
      settlement.fromUserId !== req.user.id &&
      settlement.toUserId !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const isFromUser = settlement.fromUserId === req.user.id;
    const isLastUpdatedByCurrentUser = settlement.lastUpdatedBy === req.user.id;

    if (isFromUser) {
      if (
        settlement.status === "submitted" ||
        (settlement.status === "disputed" && !isLastUpdatedByCurrentUser)
      ) {
        settlement.amount = amount;
        settlement.lastUpdatedBy = req.user.id;
      } else {
        return res.status(400).json({
          message:
            "Cannot update settled settlement or disputed settlement you last updated",
        });
      }
    } else if (!isLastUpdatedByCurrentUser) {
      settlement.amount = amount;
      settlement.lastUpdatedBy = req.user.id;

      if (status === "disputed") {
        settlement.status = "disputed";
      } else if (status === "settled") {
        settlement.status = "settled";
      }
    } else {
      return res
        .status(400)
        .json({ message: "Cannot update settlement you last updated" });
    }

    await settlement.save();

    notifyUsers([settlement.toUserId], {
      type: "settlementUpdated",
      data: settlement,
    });

    res.json(settlement);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getSettlements = async (req, res) => {
  try {
    const userId = req.user.id;
    const settlements = await Settlement.findAll({
      where: {
        [Op.or]: [{ fromUserId: userId }, { toUserId: userId }],
      },
      include: [
        {
          model: User,
          as: "FromUser",
          attributes: ["id", "username", "fullname"],
        },
        {
          model: User,
          as: "ToUser",
          attributes: ["id", "username", "fullname"],
        },
      ],
    });
    res.json(settlements);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getSettlement = async (req, res) => {
  try {
    const { id } = req.params;
    const settlements = await Settlement.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "FromUser",
          attributes: ["id", "username", "fullname"],
        },
        {
          model: User,
          as: "ToUser",
          attributes: ["id", "username", "fullname"],
        },
      ],
    });
    res.json(settlements);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createSettlement,
  updateSettlement,
  getSettlements,
  getSettlement,
};
