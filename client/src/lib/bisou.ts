import { ethers } from "ethers";

// BISOU Token Contract
const BISOU_CONTRACT_ADDRESS = "0x951Ed6e6e75e913494C19173C30C6D3C59CffF8F";

// Simplified ABI for the $BISOU token
const BISOU_ABI = [
  // Read-only functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  // Transaction functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  // Mock function for buying tokens directly (this wouldn't exist in a real ERC20 token)
  "function buy() payable",
];

// Get BISOU token contract
export const getBisouTokenContract = async (signerOrProvider: any) => {
  return new ethers.Contract(BISOU_CONTRACT_ADDRESS, BISOU_ABI, signerOrProvider);
};

// Get current token price (mock function - in a real app this would call an API)
export const getBisouTokenPrice = async (): Promise<number> => {
  // In a real app, you'd fetch this from an API like CoinGecko or a DEX
  return 0.00024; // ETH per token
};

// Get token market info (mock function - in a real app this would call an API)
export const getTokenMarketInfo = async () => {
  // In a real app, you'd fetch this from an API
  return {
    price: 0.00024, // ETH per token
    change24h: 5.2, // Percentage
    marketCap: 1200000, // USD
  };
};

// Format market cap to human-readable string
export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1000000000) {
    return `$${(marketCap / 1000000000).toFixed(1)}B`;
  }
  if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(1)}M`;
  }
  if (marketCap >= 1000) {
    return `$${(marketCap / 1000).toFixed(1)}K`;
  }
  return `$${marketCap}`;
};
