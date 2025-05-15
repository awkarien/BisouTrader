import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface WarpcastShareProps {
  text?: string;
  url?: string;
  className?: string;
}

const WarpcastShare = ({ 
  text = "Check out $BISOU Token! 💰", 
  url = "https://bisou-trader-1gih-4owgwr9rq-awkariens-projects.vercel.app", 
  className = ""
}: WarpcastShareProps) => {
  const { toast } = useToast();

  const handleShare = () => {
    // Encode text and URL for sharing
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    
    // Warpcast sharing URL format
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodedText}&embeds[]=${encodedUrl}`;
    
    // Open in a new window
    window.open(warpcastUrl, '_blank');
    
    toast({
      title: "Opening Warpcast",
      description: "You'll be redirected to Warpcast to share $BISOU",
    });
  };

  return (
    <Button
      onClick={handleShare}
      className={`bg-gradient-to-r from-purple-600 to-indigo-800 hover:opacity-90 ${className}`}
    >
      <svg 
        viewBox="0 0 24 24" 
        className="w-4 h-4 mr-2 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21.2,8.67a23.42,23.42,0,0,1-2.7,12,10.11,10.11,0,0,1-3.05,3.32,7.7,7.7,0,0,1-3.44,1,7.43,7.43,0,0,1-3.42-.79A7.51,7.51,0,0,1,5.66,22,13.62,13.62,0,0,1,3.24,18.9,26.65,26.65,0,0,1,2,13.17,33.36,33.36,0,0,1,1.58,7a26.29,26.29,0,0,1,.7-5.67.93.93,0,0,1,.43-.56A4.56,4.56,0,0,1,4.3,0,4.93,4.93,0,0,1,7.89,1.46,11.63,11.63,0,0,1,5.81,5.13,3.07,3.07,0,0,0,4.92,4.8a2.28,2.28,0,0,0-1.16.27,2.06,2.06,0,0,0-.79.8,2.55,2.55,0,0,0-.3,1.29,8.05,8.05,0,0,0,.06,1,23.28,23.28,0,0,0,.74,3.92,21.57,21.57,0,0,0,1.21,3.6,16.15,16.15,0,0,0,1.41,2.61,5.92,5.92,0,0,0,1.54,1.64A3.42,3.42,0,0,0,9.56,20a3.35,3.35,0,0,0,1.87-.35A3,3,0,0,0,12.9,17.9a9.87,9.87,0,0,0,.47-3,8.77,8.77,0,0,0-2.13-5.76,11.63,11.63,0,0,0-6-3.34,13.06,13.06,0,0,0-4.07-.37,8.1,8.1,0,0,0-2.76.58A3.66,3.66,0,0,1,.7,5.78a4.33,4.33,0,0,1,1-2.8A5.11,5.11,0,0,1,4.2,1.56,7.72,7.72,0,0,1,7.7,1.33a11.47,11.47,0,0,1,4,.94A16.56,16.56,0,0,1,16,4.88a16.27,16.27,0,0,1,3.09,3.65A12.66,12.66,0,0,0,16.28,8a10.33,10.33,0,0,0-2.62-2.54A8.24,8.24,0,0,0,10.28,4,5.23,5.23,0,0,0,7.82,4.7a4.14,4.14,0,0,0-1.65,1.9,5.07,5.07,0,0,0-.51,2.3,4.39,4.39,0,0,0,.38,1.86,3.79,3.79,0,0,0,1.11,1.37,5.53,5.53,0,0,0,1.92.87,8.77,8.77,0,0,0,2.22.23,20,20,0,0,0,4.21-.45A11.3,11.3,0,0,1,16.29,16a12.51,12.51,0,0,1-2.33,2.26,8.1,8.1,0,0,1-2.37,1.21A7.43,7.43,0,0,1,9,20a5.64,5.64,0,0,1-2.58-.56A7.08,7.08,0,0,1,4.2,17.6a12,12,0,0,1-1.58-2.8A22.84,22.84,0,0,1,1.3,10.92a26.83,26.83,0,0,1-.47-3.53,9.22,9.22,0,0,1,.08-1.47,2.3,2.3,0,0,1,.8-1.64,2.8,2.8,0,0,1,1.83-.54A2.06,2.06,0,0,1,4.92,4a9.81,9.81,0,0,0,2.73-1.88,10.82,10.82,0,0,0,2-2.75,7.52,7.52,0,0,1,2.2.91,12.63,12.63,0,0,1,2.65,2.19,22.32,22.32,0,0,1,2.9,3.8A25.34,25.34,0,0,1,21.2,8.67Z" />
      </svg>
      Share on Warpcast
    </Button>
  );
};

export default WarpcastShare;