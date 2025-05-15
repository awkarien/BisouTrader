import { CheckIcon, ClockIcon, XIcon, ExternalLink } from "./icons";

interface TransactionStatusProps {
  status: "pending" | "completed" | "failed";
  amount: number;
  hash?: string;
}

const TransactionStatus = ({ status, amount, hash }: TransactionStatusProps) => {
  const getStatusClass = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-900 bg-opacity-30 border-yellow-700";
      case "completed":
        return "bg-green-900 bg-opacity-30 border-green-700";
      case "failed":
        return "bg-red-900 bg-opacity-30 border-red-700";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <ClockIcon className="h-4 w-4 text-white" />;
      case "completed":
        return <CheckIcon className="h-4 w-4 text-white" />;
      case "failed":
        return <XIcon className="h-4 w-4 text-white" />;
    }
  };

  const getStatusBgClass = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-600";
      case "completed":
        return "bg-green-600";
      case "failed":
        return "bg-red-600";
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "pending":
        return "Transaction in progress...";
      case "completed":
        return "Transaction completed!";
      case "failed":
        return "Transaction failed";
    }
  };

  return (
    <div className={`mt-6 p-4 rounded-xl border ${getStatusClass()}`}>
      <div className="flex items-center">
        <div className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center ${getStatusBgClass()}`}>
          {getStatusIcon()}
        </div>
        <div>
          <p className="font-medium">{getStatusMessage()}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {status === "completed"
              ? `Successfully purchased ${amount} $BISOU tokens`
              : status === "failed"
              ? `Failed to purchase $BISOU tokens`
              : `Buying ${amount} $BISOU tokens`}
          </p>
        </div>
      </div>
      
      {(status === "completed" || status === "failed") && hash && (
        <div className="mt-3">
          <a 
            href={`https://basescan.org/tx/${hash}`}
            className="text-sm text-primary hover:underline flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Explorer
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
};

export default TransactionStatus;
