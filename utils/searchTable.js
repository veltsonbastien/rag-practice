import { DB_NAME } from "../constants.js";
import pool from "../config/db.js";
import { generateEncodings } from "../ai/index.js";

const SEARCH_LIMIT = 5;

export const searchTable = async (prompt) => {
  const encodedPrompt = await generateEncodings([prompt]);
  const encodedPromptVector = encodedPrompt[0];

  console.log("Encoded prompt: ", encodedPromptVector);

  const searchTableQuery = `SELECT id, cos_dist(vector, ARRAY[${encodedPromptVector.toString()}]) 
                                        AS dist, payload FROM ${DB_NAME} 
                                        ORDER BY vector <=> ARRAY[${encodedPromptVector.toString()}]
                                        LIMIT ${SEARCH_LIMIT};`;

  try {
    console.log("Searching table...");
    const res = await pool.query(searchTableQuery);
    const rows = await res.rows;
    console.log("Closest matches: ", rows);
    rows.forEach((row) => {
      console.log(
        `${row.payload.name} has a distance of ${row.dist} from the query prompt`,
      );
    });
    return rows;
  } catch (e) {
    console.error("Error searching table: ", e);
    return null;
  }
};
