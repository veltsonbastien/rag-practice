import { DB_NAME } from "../constants.js";
import pool from "../config/db.js";
import { insertData } from "../utils/insertData.js";

const getCountQuery = `SELECT COUNT(*) FROM ${DB_NAME}`;

export const addEncodingsToDb = async (data, encodings) => {
  console.log("Adding encodings to db...");
  try {
    const res = await pool.query(getCountQuery);
    const count = Number(await res.rows[0].count);

    if (count === 0) {
      console.log("Table is empty, inserting data...");
      try {
        for (let i = 0; i < encodings.length; i++) {
          await insertData(i, encodings[i], data[i]);
        }
        console.log("Successfully added encodings to db!");
      } catch (e) {
        console.error("Error inserting data: ", e);
      }
    }
  } catch (e) {
    console.error("Error adding encodings to db: ", e);
  }
};
