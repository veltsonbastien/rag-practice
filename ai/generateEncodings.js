import { pipeline } from "@xenova/transformers";

const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

export const generateEncodings = async (input) => {
  console.log("Generating encodings...");
  try {
    const encoder = await pipeline("feature-extraction", MODEL_ID);
    const encodingData = await encoder(input, {
      pooling: "mean",
      normalize: true,
    });
    return encodingData.tolist();
  } catch (e) {
    console.error("Error in generateEncodings: ", e);
    return null;
  }
};
