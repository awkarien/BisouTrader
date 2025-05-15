import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import BisouCard from "../components/bisou-card";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [location] = useLocation();
  const search = useSearch();
  const { toast } = useToast();
  const [isFrameView, setIsFrameView] = useState(false);

  useEffect(() => {
    // Check if this is being loaded as a frame
    const urlParams = new URLSearchParams(search);
    const frameAction = urlParams.get("frameAction");
    
    if (frameAction) {
      setIsFrameView(true);
      // Handle frame actions
      if (frameAction === "buy50") {
        toast({
          title: "Frame Action Received",
          description: "You chose to buy 50 $BISOU tokens",
        });
      } else if (frameAction === "buy250") {
        toast({
          title: "Frame Action Received",
          description: "You chose to buy 250 $BISOU tokens",
        });
      } else if (frameAction === "buy500") {
        toast({
          title: "Frame Action Received",
          description: "You chose to buy 500 $BISOU tokens",
        });
      } else if (frameAction === "custom") {
        toast({
          title: "Frame Action Received",
          description: "You chose to enter a custom amount",
        });
      }
    }
  }, [search, toast]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-6">
      <BisouCard isFrameView={isFrameView} />
    </div>
  );
};

export default Home;
