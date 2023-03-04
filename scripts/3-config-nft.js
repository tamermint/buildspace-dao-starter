import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0x09Fe10535f40d339629441C974C81BfBA129B255", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "AllFather",
        description: "This NFT will give you access to AsgardDAO!",
        image: readFileSync("scripts/assets/OdinFury.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();