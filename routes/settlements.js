const express = require("express");
const {
  createSettlement,
  updateSettlement,
  getSettlements,
  getSettlement,
} = require("../controllers/settlementController");
const authenticate = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticate, createSettlement);
router.put("/", authenticate, updateSettlement);
router.get("/", authenticate, getSettlements);
router.get("/:id", authenticate, getSettlement);
module.exports = router;
