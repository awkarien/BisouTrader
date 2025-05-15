import { useState, useEffect } from "react";
import { getBisouTokenPrice } from "../lib/bisou";

const TokenInfo = () => {
  const [tokenInfo, setTokenInfo] = useState({
    price: "0.00024", // ETH per token
    change: "+5.2%",
    marketCap: "$1.2M"
  });

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        // In a real app, we'd fetch the actual token price from an API
        // For now, we're using the mock data from the design
        const price = await getBisouTokenPrice();
        // We'd update the state with real data here
      } catch (error) {
        console.error("Failed to fetch token price:", error);
      }
    };

    fetchTokenInfo();
  }, []);

  return (
    <div className="bg-muted rounded-xl p-4 mb-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground text-sm">Current Price</p>
          <p className="text-xl font-bold">{tokenInfo.price} ETH</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">24h Change</p>
          <p className="text-success font-medium">{tokenInfo.change}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Market Cap</p>
          <p className="font-medium">{tokenInfo.marketCap}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
