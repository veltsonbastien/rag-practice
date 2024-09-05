import pool from "../config/db.js";
import { DB_NAME, MODEL_EMBEDDING_SIZE } from "../constants.js";

const createIndexQuery = `CREATE INDEX IF NOT EXISTS idx_${DB_NAME}_vector_cosine 
                                    ON ${DB_NAME} 
                                    USING lantern_hnsw (vector dist_cos_ops)
                                    WITH ( dim = ${MODEL_EMBEDDING_SIZE} );`;

export const createIndex = async () => {
  try {
    await pool.query(createIndexQuery);
    //console.log("Successfully created index: ", res);
  } catch (e) {
    console.error("Error creating index: ", e);
  }
};
