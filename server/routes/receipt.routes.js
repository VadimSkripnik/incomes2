const express = require("express");
const Receipt = require("../models/Receipt");
const Card = require("../models/Card");
const auth = require("../middleware/auth.middleware");

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await Receipt.find();

    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newReceipt = await Receipt.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).send(newReceipt);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:receiptId", auth, async (req, res) => {
  try {
    const { receiptId } = req.params;

    if (receiptId) {
      const updatedReceipt = await Receipt.findByIdAndUpdate(
        receiptId,
        req.body,
        { new: true }
      );

      res.send(updatedReceipt);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:receiptId", auth, async (req, res) => {
  try {
    const { receiptId } = req.params;
    const removedReceipt = await Receipt.findById(receiptId);
    if (removedReceipt.userId.toString() === req.user._id) {
      await removedReceipt.remove();
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
