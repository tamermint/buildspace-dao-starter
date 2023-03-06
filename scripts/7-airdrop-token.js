import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

(async () => {
  try {
    // This is the address to our ERC-1155 membership NFT contract.
    const editionDrop = await sdk.getContract("0x09Fe10535f40d339629441C974C81BfBA129B255", "edition-drop");
    // This is the address to our ERC-20 token contract.
    const token = await sdk.getContract("0x68efD2116aa5A3B7B6f230347c137258f61a3101", "token");
    // Grab all the addresses of people who own our membership NFT, which has 
    // a tokenId of 0.


    const endpoint = "https://fittest-thrilling-tab.ethereum-goerli.discover.quiknode.pro";
    const chainId = 5; // Goerli test network
    const headers = {
      "Authorization": "Bearer fef98ae7ca085fe9c1c051f99d91db69d6f9039c"
    };
    
    const provider = new ethers.providers.JsonRpcProvider({url: endpoint, chainId, headers});


    const currentBlock = await provider.getBlockNumber();

    const fromBlock = Math.max(1, currentBlock - 10000);
    const toBlock = "latest";

    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0, {
    fromBlock: fromBlock,
    toBlock: toBlock
    });

    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
        // Pick a random # between 1000 and 10000.
        const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
        console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
  
        // Set up the target.
        const airdropTarget = {
          toAddress: address,
          amount: randomAmount,
        };
  
        return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();