import { initializeDb, main } from "./utils/index.js";
import pool from "./config/db.js";

initializeDb()
  .then(async () => {
    try {
      await main();
    } catch (e) {
      console.error("Error in main: ", e);
    }
  })
  .catch((e) => console.error("Error initializing db: ", e))
  .finally(() =>
    pool
      .end()
      .then(() => console.log("Properly closed client!"))
      .catch((e) => console.error("Error terminating client: ", e)),
  );
