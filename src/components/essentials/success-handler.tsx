import { CheckCircle2 } from "lucide-react";

const SuccessMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center p-4 bg-green-100 text-green-700 rounded-lg">
      <CheckCircle2 size={24} />
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default SuccessMessage;
