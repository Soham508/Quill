import { query } from "express";
import connectDB from "../db/db.js";

export const getFollowingsController = async (req, res) => {
  try {
    const client = await connectDB();
    const id = req.params.userId;
    const query = `
    SELECT u.*
    FROM followers f
    JOIN users u ON f.followed_id = u.user_id
    WHERE f.follower_id = $1;
  `;

    const result = await client.query(query, [id]);
    client.release();

    if (result?.rows?.length > 0) {
      const sanitizedUsers = result.rows.map((user) => {
        const { password, ...sanitizedUser } = user;
        return sanitizedUser;
      });

      res.status(200).json({
        success: true,
        following: sanitizedUsers,
      });
    } else {
      res
        .status(404)
        .json({ success: success, message: "Not following anyone" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "failed to fetch user followings",
    });
  }
};

export const followByIdController = async (req, res) => {
  try {
    const { follower_id, followee_id } = req.body;

    const client = await connectDB();

    const query = `
         INSERT INTO followers (follower_id, followed_id)
        VALUES ($1, $2);
    `;
    try {
      const result = await client.query(query, [follower_id, followee_id]);
      client.release();

      res.send({
        success: true,
        message: "Followed!",
        result: result || "",
        duplicate: false,
      });
    } catch (err) {
      if (err.code == "23503") {
        res.send({
          success: false,
          message: "Already followed",
          duplicate: true,
        });
      }
    }
  } catch (err) {
    res.send({
      success: false,
      err,
      message: `Failed to follow, ${err.message}`,
    });
  }
};

export const unfollowByIdController = async (req, res) => {
  try {
    const { follower_id, followee_id } = req.body;

    const client = await connectDB();

    const query = `
      DELETE FROM followers 
      WHERE follower_id = $1 AND followed_id = $2;
    `;

    try {
      const result = await client.query(query, [follower_id, followee_id]);
      client.release();

      if (result.rowCount === 0) {
        res.send({
          success: false,
          message: "You were not following this user.",
        });
      } else {
        res.send({
          success: true,
          message: "Unfollowed successfully!",
        });
      }
    } catch (err) {
      res.send({
        success: false,
        message: "Failed to unfollow.",
        error: err.message,
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: `Error in unfollowing: ${err.message}`,
    });
  }
};
