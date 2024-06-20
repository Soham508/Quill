import express from "express";
import {
  createPostController,
  getPostByAuthorIdController,
  getPostsByTitleController,
  getUserFeed,
} from "../controllers/postControllers.js";

const router = express.Router();

router.get("/feed/:id", getUserFeed);

router.get("/authorId/:id", getPostByAuthorIdController);

router.post("/createPost", createPostController);

router.get("/search", getPostsByTitleController);

export default router;
