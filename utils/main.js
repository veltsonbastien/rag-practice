import {
  addEncodingsToDb,
  getDataFromFile,
  searchTable,
} from "../utils/index.js";
import { generateEncodings } from "../ai/index.js";

//5 is a good number for dev but could be increased up to 700 for actual use (will take a few minutes)
const MAX_ENCODINGS = 5;

export const main = async () => {
  //get data from CSV as formatted array of objects (only up to MAX_ENCODINGS as generating encodings takes a while)
  const data = await getDataFromFile();
  const sliced_data = data.slice(0, MAX_ENCODINGS);

  //get only the notes to create embeddings
  const notes = sliced_data.map((d) => d.notes);

  //generate encodings for each note
  const encodings = await generateEncodings(notes);

  console.log(
    `Data has ${sliced_data.length} entries and successfully generated ${encodings.length} encodings!`,
  );

  //add encodings to the database
  await addEncodingsToDb(sliced_data, encodings);

  //now we can start searching for similar notes
  const user_prompt = "Suggest me an amazing Malbec wine from Argentina";

  console.log("Prompt: ", user_prompt);
  await searchTable(user_prompt);
};
