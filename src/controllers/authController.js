import connectDB from "../db/db.js";
import { hashPassword, comparePassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, email, full_name, bio, profile_picture_url } = req.body;
    let { password } = req.body;

    //validations
    if (!username) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    const client = await connectDB();
    const query = `
        INSERT INTO users (username, email, password, full_name, bio, profile_picture_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
    password = await hashPassword(password);
    const values = [
      username,
      email,
      password,
      full_name,
      bio,
      profile_picture_url,
    ];

    const result = await client.query(query, values);
    client.release();

    res.status(201).json({...result.rows[0], success: true});
  } catch (err) {
    console.log("error in registration", err);
    res.status(500).send({
      success: false,
      err,
      message: "Failed to register the user!",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const client = await connectDB();
    const query = "SELECT * FROM users WHERE email = $1";
    const user = await client.query(query, [email]);
    client.release();

    if (!user.rows.length > 0) {
      res.status(404).send({
        success: false,
        message: "Email is not registered!",
      });
    }

    const match = await comparePassword(password, user.rows[0].password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign(
      { _id: user.rows[0].user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: user.rows[0],
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login",
      err,
    });
  }
};
