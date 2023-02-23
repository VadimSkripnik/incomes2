const express = require("express");
const RateCategory = require("../models/RateCategory");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const Card = require("../models/Card");
const {
  convertArrayOfElementsToId,
  lookingForTheRightItem,
} = require("../utils/helpers");

router.get("/", auth, async (req, res) => {
  try {
    const list = await RateCategory.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newRateCategory = await RateCategory.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).send(newRateCategory);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:rateCategoryId", auth, async (req, res) => {
  try {
    const { rateCategoryId } = req.params;
    if (rateCategoryId) {
      const updatedRateCategory = await RateCategory.findByIdAndUpdate(
        rateCategoryId,
        req.body,
        { new: true }
      );
      res.send(updatedRateCategory);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:rateCategoryId", auth, async (req, res) => {
  try {
    const { rateCategoryId } = req.params;

    const removedRateCategory = await RateCategory.findById(rateCategoryId);

    if (removedRateCategory.userId.toString() === req.user._id) {
      await removedRateCategory.remove();
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
