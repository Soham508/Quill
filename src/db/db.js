import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "mediumDB_owner",
  host: "ep-round-king-a1woluxb.ap-southeast-1.aws.neon.tech",
  database: "mediumDB",
  password: "yIe7fc2kpQja",
  port: 5432,
  sslmode: "require",
  ssl: {
    rejectUnauthorized: false, // Optionally set to false if you're using self-signed certificates
  },
});

async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("connected to pg database");
    return client;
  } catch (err) {
    console.log("error", err);
  }
}

export default connectDB;
