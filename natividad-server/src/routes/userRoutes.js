import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.route("/").get(getUser).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
