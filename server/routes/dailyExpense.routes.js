const express = require("express");
const DailyExpense = require("../models/DailyExpense");
const Rate = require("../models/Rate");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await DailyExpense.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const list = await DailyExpense.findById(req.params.id);
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newDailyExpense = await DailyExpense.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).send(newDailyExpense);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:expenseId", auth, async (req, res) => {
  try {
    const { expenseId } = req.params;
    if (expenseId) {
      const updatedDailyExpense = await DailyExpense.findByIdAndUpdate(
        expenseId,
        {
          ...req.body,
        }
      );

      res.send(updatedDailyExpense);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:expenseId", auth, async (req, res) => {
  try {
    const { expenseId } = req.params;
    const removedDailyExpense = await DailyExpense.findById(expenseId);
    if (removedDailyExpense.userId.toString() === req.user._id) {
      await removedDailyExpense.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
