import {
  addEncodingsToDb,
  getDataFromFile,
  searchTable,
} from "../utils/index.js";
import { generateEncodings, giveResponse } from "../ai/index.js";

//5 is a good number for dev but could be increased up to 700 for actual use (will take a few minutes)
const MAX_ENCODINGS = 700;

export const main = async () => {
  //get data from CSV as formatted array of objects (only up to MAX_ENCODINGS as generating encodings takes a while)
  const data = await getDataFromFile();
  const sliced_data = data.slice(0, MAX_ENCODINGS);

  //get only the notes to create embeddings
  const notes = sliced_data.map((d) => d.notes);

  //This is only necessary first time, keeping here for the sake of the demo:

  //generate encodings for each note
  //const encodings = await generateEncodings(notes);

  // console.log(
  //   `Data has ${sliced_data.length} entries and successfully generated ${encodings.length} encodings!`,
  // );

  //add encodings to the database
  //await addEncodingsToDb(sliced_data, encodings);

  //now we can start searching for similar notes
  const user_prompt =
    "I don't drink much wine but I'm from California and I like sweet wines. What do you recommend?";

  console.log("Prompt: ", user_prompt);
  const selectedWinesPayloads = await searchTable(user_prompt);

  //if we properly got payloads, generate a response with OpenAI
  if (selectedWinesPayloads.length > 0) {
    const response = await giveResponse(user_prompt, selectedWinesPayloads);
    console.log(response);
  }
};
