import express from "express";
import { registerAuth, loginAuth } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerAuth);
router.post("/login", loginAuth);

export default router;
