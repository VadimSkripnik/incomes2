const express = require("express");
const Rate = require("../models/Rate");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await Rate.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newRate = await Rate.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).send(newRate);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:rateId", auth, async (req, res) => {
  try {
    const { rateId } = req.params;
    if (rateId) {
      const updatedRate = await Rate.findByIdAndUpdate(rateId, req.body, {
        new: true,
      });
      res.send(updatedRate);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:rateId", auth, async (req, res) => {
  try {
    const { rateId } = req.params;
    const removedRate = await Rate.findById(rateId);

    if (removedRate.userId.toString() === req.user._id) {
      await removedRate.remove();
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
