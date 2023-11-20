import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getallHotel,
  countByCity,
  countByType,
} from "../controllers/hotel.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/find/:id", getHotel);

// GET ALL
router.get("/", getallHotel);

router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);

export default router;
