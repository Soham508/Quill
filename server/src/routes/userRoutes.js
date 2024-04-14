import express from "express";
import {
  userBynameController,
  userByidController,
} from "../controllers/userControllers.js";
import { followByIdController } from "../controllers/followControllers.js";

const router = express.Router();

//For, fetching user by username
router.get("/:username", userBynameController);

//For, fetching user by id
router.get("/id/:id", userByidController);

router.post("/follow", followByIdController);

export default router;
