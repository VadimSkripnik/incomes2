const express = require("express");
const IncomeCategory = require("../models/IncomeCategory");
const Card = require("../models/Card");
const auth = require("../middleware/auth.middleware");
const {
  convertArrayOfElementsToId,
  lookingForTheRightItem,
} = require("../utils/helpers");
const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await IncomeCategory.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newIncomeCategory = await IncomeCategory.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).send(newIncomeCategory);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:incomeCategoryId", auth, async (req, res) => {
  try {
    const { incomeCategoryId } = req.params;
    if (incomeCategoryId) {
      const updatedIncomeCategory = await IncomeCategory.findByIdAndUpdate(
        incomeCategoryId,
        req.body,
        { new: true }
      );
      res.send(updatedIncomeCategory);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:incomeCategoryId", auth, async (req, res) => {
  try {
    const { incomeCategoryId } = req.params;
    const removedIncomeCategory = await IncomeCategory.findById(
      incomeCategoryId
    );

    if (removedIncomeCategory.userId.toString() === req.user._id) {
      await removedIncomeCategory.remove();
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
