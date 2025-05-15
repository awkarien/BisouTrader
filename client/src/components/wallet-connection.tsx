import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WalletIcon } from "./icons";
import { useToast } from "@/hooks/use-toast";
import { connectWallet, disconnectWallet } from "../lib/web3";

interface WalletConnectionProps {
  walletAddress: string | null;
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}

const WalletConnection = ({ walletAddress, onConnect, onDisconnect }: WalletConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const address = await connectWallet();
      onConnect(address);
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      onDisconnect();
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  const shortenAddress = (address: string) => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  };

  return (
    <div className="w-full">
      {!walletAddress ? (
        <Button 
          className="w-full bg-secondary hover:bg-opacity-80 transition-colors"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          <WalletIcon className="h-5 w-5 mr-2" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <div className="flex justify-between items-center bg-muted rounded-xl p-4">
          <div className="flex items-center">
            <div className="bg-success w-2 h-2 rounded-full mr-2"></div>
            <p className="text-sm font-medium">{shortenAddress(walletAddress)}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;
