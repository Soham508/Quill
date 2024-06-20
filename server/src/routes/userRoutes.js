import express from "express";
import {
  userBynameController,
  userByidController,
  userUpdateController,
} from "../controllers/userControllers.js";
import {
  followByIdController,
  getFollowingsController,
} from "../controllers/followControllers.js";

const router = express.Router();

//For, fetching user by username
router.get("/:username", userBynameController);

//For, fetching user by id
router.get("/id/:id", userByidController);

router.post("/follow", followByIdController);

router.get("/followings/:userId", getFollowingsController);

router.post("/update-profile", userUpdateController);

export default router;
