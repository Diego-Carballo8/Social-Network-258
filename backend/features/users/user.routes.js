import express from "express";
import User from "./user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "_id username");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

export default router;