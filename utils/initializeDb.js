import { createTable, createIndex } from "../utils/index.js";

export const initializeDb = async () => {
  try {
    await createTable();
    await createIndex();

    console.log("Properly initialized db!");
  } catch (e) {
    console.error("Error initializing db: ", e);
  }
};
