import connectDB from "../db/db.js";
import slugify from "slugify";

export const getPostByAuthorIdController = async (req, res) => {
  try {
    const client = await connectDB();
    const query = "SELECT * FROM posts WHERE author_id = $1";

    const result = await client.query(query, [req.params.id]);

    client.release();

    if (result?.rows?.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "Posts not found" });
    }
  } catch (err) {
    console.log("failed to fetch post(s) by authorID", err);
    res.status(500).send({
      success: false,
      err,
      message: "Failed to fetch post(s) by authorID",
    });
  }
};

export const createPostController = async (req, res) => {
  try {
    // Destructure required and optional fields from request body
    let { title, content, author_id, thumbnail, categories } = req.body;

    if (!title || !content || !author_id) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Title, content, and author_id are required",
        });
    }
    if (categories == null) {
      categories = [];
    }

    // Inserting new post into the database
    const client = await connectDB();
    const query = `
        INSERT INTO posts (title, content, author_id, thumbnail, slug, categories)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
    let values;
    const slug = slugify(title, { lower: true, strict: true });

    if (published) {
      values = [title, content, author_id, thumbnail, slug, categories];
    } else {
      values = [title, content, author_id, thumbnail, slug, categories];
    }

    const result = await client.query(query, values);
    client.release();

    // Send the newly created post as the response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log("Error creating post:", err);
    res.status(500).send({
      success: false,
      err,
      message: "Failed to create the post!",
    });
  }
};

export const getPostsByTitleController = async (req, res) => {
  try {
    const { search } = req.query; // Get search term from query params
    const client = await connectDB();

    const query = `
        SELECT * 
        FROM posts 
        WHERE LOWER(title) LIKE $1 OR LOWER(slug) LIKE $1
      `;

    // Add wildcard (%) to search term to search for partial matches
    const searchTerm = `%${search.toLowerCase()}%`;

    const result = await client.query(query, [searchTerm]);
    client.release();

    if (result?.rows?.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res
        .status(404)
        .json({ message: "No posts found matching the search term" });
    }
  } catch (err) {
    console.log("Error fetching posts by title:", err);
    res.status(500).send({
      success: false,
      err,
      message: "Server error for finding posts!",
    });
  }
};
