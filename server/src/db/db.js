import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432,
  sslmode: "require",
  ssl: {
    rejectUnauthorized: false, // Optionally set to false if you're using self-signed certificates
  },
});

async function connectDB() {
  try {
    const client = await pool.connect();

    return client;
  } catch (err) {
    console.error("Error connecting to PostgreSQL database:", err);
  }
}

export default connectDB;
