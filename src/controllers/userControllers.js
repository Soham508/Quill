import connectDB from "../db/db.js";

export const userBynameController = async (req, res) => {
  try {
    const client = await connectDB();
    const name = req.params.username;
    const query = "SELECT * FROM users WHERE username = $1";

    const result = await client.query(query, [name]);
    client.release();

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("failed to fetch user", err);
    res.status(500).send({
      success: false,
      err,
      message: "failed to fetch user",
    });
  }
};

export const userByidController = async (req, res) => {
  try {
    const client = await connectDB();
    const id = req.params.id;
    const query = "SELECT * FROM users WHERE user_id = $1";

    const result = await client.query(query, [id]);
    client.release();

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("failed to fetch user", err);
    res.status(500).send({
      success: false,
      err,
      message: "failed to fetch user",
    });
  }
};
