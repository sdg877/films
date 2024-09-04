import express from "express";
import { create, login, update, checkToken } from "../controllers/users.js";
import ensureLoggedIn from "../config/ensureLoggedIn.js";

const router = express.Router();

router.get("check-token", ensureLoggedIn, checkToken);
router.post("/create", create);
router.post("/login", login);
router.put("/:id", update);

export default router;
