import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface PurchaseOptionsProps {
  isWalletConnected: boolean;
  onPurchase: (amount: number) => Promise<boolean>;
}

const PurchaseOptions = ({ isWalletConnected, onPurchase }: PurchaseOptionsProps) => {
  const [isCustomAmountVisible, setIsCustomAmountVisible] = useState(false);
  const [customAmount, setCustomAmount] = useState<number>(0);
  const { toast } = useToast();
  
  const tokenPrice = 0.00024; // ETH per token
  
  const calculatePrice = (amount: number) => {
    return (amount * tokenPrice).toFixed(5) + " ETH";
  };

  const handlePurchase = async (amount: number) => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first to make a purchase",
        variant: "destructive",
      });
      return;
    }

    await onPurchase(amount);
  };

  const handleCustomPurchase = async () => {
    if (!customAmount || customAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    await handlePurchase(customAmount);
  };

  return (
    <div className="w-full mb-6">
      <h2 className="text-lg font-semibold mb-3">Buy $BISOU</h2>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Fixed amount options */}
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => handlePurchase(50)}
        >
          <p className="text-lg font-bold">50</p>
          <p className="text-sm text-muted-foreground">$BISOU</p>
          <p className="text-xs mt-2 text-muted-foreground">{calculatePrice(50)}</p>
        </Button>
        
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => handlePurchase(250)}
        >
          <p className="text-lg font-bold">250</p>
          <p className="text-sm text-muted-foreground">$BISOU</p>
          <p className="text-xs mt-2 text-muted-foreground">{calculatePrice(250)}</p>
        </Button>
        
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => handlePurchase(500)}
        >
          <p className="text-lg font-bold">500</p>
          <p className="text-sm text-muted-foreground">$BISOU</p>
          <p className="text-xs mt-2 text-muted-foreground">{calculatePrice(500)}</p>
        </Button>
        
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
          onClick={() => setIsCustomAmountVisible(!isCustomAmountVisible)}
        >
          <p className="text-lg font-bold">Custom</p>
          <p className="text-sm text-muted-foreground">$BISOU</p>
          <p className="text-xs mt-2 text-muted-foreground">You decide</p>
        </Button>
      </div>
      
      {/* Custom amount input */}
      {isCustomAmountVisible && (
        <div className="bg-muted p-4 rounded-xl border border-border mb-4">
          <div className="flex flex-col">
            <label htmlFor="customAmount" className="text-sm text-muted-foreground mb-2">
              Enter amount of $BISOU to purchase:
            </label>
            <div className="flex">
              <Input
                id="customAmount"
                type="number"
                placeholder="100"
                min="1"
                className="rounded-r-none"
                onChange={(e) => setCustomAmount(parseInt(e.target.value) || 0)}
              />
              <Button 
                className="rounded-l-none"
                onClick={handleCustomPurchase}
              >
                Buy
              </Button>
            </div>
            <p className="text-xs mt-2 text-muted-foreground">
              Estimated cost: {calculatePrice(customAmount)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOptions;
