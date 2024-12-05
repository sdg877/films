import express from "express";
import { create, login, update, checkToken, getUser } from "../controllers/users.js";
import { validateToken } from "../controllers/users.js";
import authenticateUser from "../middleware/authenticateUser.js";
import ensureLoggedIn from "../config/ensureLoggedIn.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/check-token", ensureLoggedIn, checkToken);
router.get("/validate", authenticateUser, validateToken);
router.post('/signup', create);
router.post('/login', login);
router.post("/:id", update);

export default router;

