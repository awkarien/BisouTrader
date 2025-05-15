import { ethers } from "ethers";
import { getBisouTokenContract, getBisouTokenPrice } from "./bisou";
import { useToast } from "@/hooks/use-toast";

// Check if window.ethereum is available
export const isEthereumAvailable = (): boolean => {
  return typeof window !== "undefined" && window.ethereum !== undefined;
};

// Connect to wallet
export const connectWallet = async (): Promise<string> => {
  if (!isEthereumAvailable()) {
    throw new Error("Ethereum provider not available. Please install MetaMask.");
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    
    if (accounts.length === 0) {
      throw new Error("No accounts found");
    }
    
    return accounts[0];
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

// Disconnect wallet (for UI purposes only as there's no true disconnection in MetaMask)
export const disconnectWallet = async (): Promise<void> => {
  // This is just a placeholder since you can't truly disconnect from MetaMask
  // You can only clear the state in your application
  return Promise.resolve();
};

// Get signer
export const getSigner = async () => {
  if (!isEthereumAvailable()) {
    throw new Error("Ethereum provider not available");
  }
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider.getSigner();
};

// Buy tokens
export const buyBisouTokens = async (amount: number): Promise<string> => {
  try {
    const signer = await getSigner();
    const contract = await getBisouTokenContract(signer);
    const price = await getBisouTokenPrice();
    
    // Calculate the amount of ETH needed to buy the tokens
    const ethAmount = price * amount;
    
    // Convert ETH amount to Wei
    const weiAmount = ethers.parseEther(ethAmount.toString());
    
    // Execute the buy transaction
    // Note: This is a simplified example. In a real app, you would need to:
    // 1. Connect to a DEX like Uniswap
    // 2. Create a swap transaction to exchange ETH for $BISOU
    // For now, we'll mock a direct buy function that doesn't exist in most ERC20 tokens
    
    const tx = await contract.buy({ value: weiAmount });
    await tx.wait();
    
    return tx.hash;
  } catch (error) {
    console.error("Error buying tokens:", error);
    throw error;
  }
};

// Get token balance
export const getBisouBalance = async (address: string): Promise<string> => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = await getBisouTokenContract(provider);
    
    const balance = await contract.balanceOf(address);
    return ethers.formatUnits(balance, 18); // Assuming 18 decimals
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw error;
  }
};
