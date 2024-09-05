import fs from "fs";
import csv from "csv-parser";

const FILE_PATH = "top_rated_wines.csv";

export const getDataFromFile = async () => {
  const records = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(FILE_PATH)
      .pipe(csv())
      .on("data", (data) => records.push(data))
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(records);
      })
      .on("error", (e) => reject(e));
  });
};
