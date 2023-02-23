const express = require("express");
const router = express.Router({ mergeParams: true});

router.use("/auth", require("./auth.routes"))
router.use("/cards", require("./card.routes"))
router.use("/dailyExpenses", require("./dailyExpense.routes"))
router.use("/incomeCategorys", require("./incomeCategory.routes"))
router.use("/rates", require("./rate.routes"))
router.use("/rateCategorys", require("./rateCategory.routes"))
router.use("/receipts", require("./receipt.routes"))
router.use("/user", require("./user.routes"))

module.exports = router;