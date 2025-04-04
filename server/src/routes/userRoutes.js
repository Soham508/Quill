import express from "express";
import {
  userBynameController,
  userByidController,
  userUpdateController,
  searchUsersController,
} from "../controllers/userControllers.js";
import {
  followByIdController,
  getFollowingsController,
  unfollowByIdController,
} from "../controllers/followControllers.js";

const router = express.Router();

//For search feature
router.get("/search", searchUsersController);

//For, fetching user by id
router.get("/id/:id", userByidController);

//For, fetching user by username
router.get("/:username", userBynameController);

router.post("/follow", followByIdController);

router.post("/unfollow", unfollowByIdController);

router.get("/followings/:userId", getFollowingsController);

router.post("/update-profile", userUpdateController);

export default router;
