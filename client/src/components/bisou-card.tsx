import { useState } from "react";
import { Card } from "@/components/ui/card";
import TokenInfo from "./token-info";
import PurchaseOptions from "./purchase-options";
import WalletConnection from "./wallet-connection";
import TransactionStatus from "./transaction-status";
import WarpcastShare from "./warpcast-share";
import { ExternalLink } from "./icons";

interface BisouCardProps {
  isFrameView?: boolean;
}

const BisouCard = ({ isFrameView = false }: BisouCardProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<{
    status: "pending" | "completed" | "failed" | null;
    amount: number;
    hash?: string;
  }>({
    status: null,
    amount: 0,
  });

  const handlePurchase = async (amount: number) => {
    if (!walletAddress) {
      return false;
    }

    // Set transaction to pending
    setTransaction({
      status: "pending",
      amount: amount,
    });

    try {
      // For demo, we'll simulate the transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success path (in real app, this would be after a real transaction)
      const txHash = "0x" + Math.random().toString(16).substr(2, 64);
      setTransaction({
        status: "completed",
        amount: amount,
        hash: txHash,
      });
      return true;
    } catch (error) {
      setTransaction({
        status: "failed",
        amount: amount,
      });
      return false;
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto overflow-hidden dark:bg-background text-foreground">
      <div className="flex flex-col items-center justify-center p-6">
        {/* Header / Token Image */}
        <div className="flex flex-col items-center justify-center mb-6">
          <img 
            src="https://ipfs.io/ipfs/bafkreighrlz43fgcdmqdtyv755zmsqsn5iey5stxvicgxfygfn6mxoy474" 
            alt="$BISOU Token" 
            className="w-24 h-24 rounded-full border-4 border-primary mb-4"
          />
          <h1 className="text-2xl font-bold text-center">$BISOU</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">BASE Network</p>
          <div className="flex items-center mt-2 px-3 py-1 bg-background dark:bg-muted rounded-full">
            <p className="text-xs font-mono text-muted-foreground">0x951Ed6e6e75e913494C19173C30C6D3C59CffF8F</p>
          </div>
        </div>

        {/* Token Information */}
        <TokenInfo />

        {/* Purchase Options */}
        <PurchaseOptions 
          isWalletConnected={!!walletAddress} 
          onPurchase={handlePurchase}
        />

        {/* Wallet Connection */}
        <WalletConnection 
          walletAddress={walletAddress} 
          onConnect={setWalletAddress} 
          onDisconnect={() => setWalletAddress(null)} 
        />

        {/* Transaction Status */}
        {transaction.status && (
          <TransactionStatus
            status={transaction.status}
            amount={transaction.amount}
            hash={transaction.hash}
          />
        )}

        {/* Share on Warpcast */}
        <div className="w-full mt-6">
          <WarpcastShare 
            text="Just discovered $BISOU token on Base Network! 💸 Check it out:" 
            url="https://bisou-trader-1gih-4owgwr9rq-awkariens-projects.vercel.app" 
            className="w-full"
          />
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-gray-800 text-center text-xs text-muted-foreground w-full">
          <p>$BISOU Token on Base Network</p>
          <p className="mt-1">Built as a Farcaster Mini App</p>
          {!isFrameView && (
            <a 
              href="https://warpcast.com/~/developers/frames" 
              target="_blank" 
              rel="noreferrer"
              className="mt-2 text-primary hover:underline inline-flex items-center"
            >
              Learn about Farcaster Frames
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </footer>
      </div>
    </Card>
  );
};

export default BisouCard;
