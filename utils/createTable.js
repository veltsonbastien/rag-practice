import pool from "../config/db.js";
import { DB_NAME, MODEL_EMBEDDING_SIZE } from "../constants.js";

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${DB_NAME} (id integer, vector real[${MODEL_EMBEDDING_SIZE}], payload json)`;
const deleteTableQuery = `DROP TABLE IF EXISTS ${DB_NAME}`;

export const createTable = async () => {
  try {
    // await pool.query(deleteTableQuery);
    await pool.query(createTableQuery);
    //console.log("Successfully created table: ", res);
  } catch (e) {
    console.error("Error creating table: ", e);
  }
};
