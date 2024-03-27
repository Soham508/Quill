import express from "express";
import {
  createPostController,
  getPostByAuthorIdController,
  getPostsByTitleController,
} from "../controllers/postControllers.js";

const router = express.Router();

router.get("/authorId/:id", getPostByAuthorIdController);

router.post("/createPost", createPostController);

router.get("/search", getPostsByTitleController);

export default router;
