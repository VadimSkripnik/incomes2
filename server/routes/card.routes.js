const express = require("express");
const IncomeCategory = require("../models/IncomeCategory");
const {
  convertArrayOfElementsToId,
  lookingForTheRightItem,
} = require("../utils/helpers");
const RateCategory = require("../models/RateCategory");
const Card = require("../models/Card");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await Card.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const list = await Card.findById(req.params.id);
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).send(newCard);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:cardId", auth, async (req, res) => {
  try {
    const { cardId } = req.params;

    if (cardId) {
      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        {
          ...req.body,
        },
        {
          new: true,
        }
      );
      res.send(updatedCard);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:cardId", auth, async (req, res) => {
  try {
    const { cardId } = req.params;
    const removedCard = await Card.findById(cardId);
    if (removedCard.userId.toString() === req.user._id) {
      await removedCard.remove();
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
