import { DB_NAME } from "../constants.js";
import pool from "../config/db.js";

export const insertData = async (id, vector, payload) => {
  try {
    const res = await pool.query(
      `INSERT INTO ${DB_NAME} (id, vector, payload) VALUES ($1, $2, $3)`,
      [id, vector, payload],
    );
    console.log("Successfully inserted data: ", res);
  } catch (e) {
    console.error("Error inserting data: ", e);
  }
};
