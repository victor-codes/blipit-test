import { cn, StatusColorMap, StatusTextMap } from "@/lib/utils";
import { StatusType } from "@blnkfinance/blnk-typescript/dist/src/types/transactions";

export const StatusPill = ({ status }: { status: StatusType }) => {
  const statusText = StatusTextMap[status];
  const statusClass = StatusColorMap[status] || "bg-gray-100 text-gray-600";

  return (
    <div className={cn(statusClass, "px-2 py-1.5 rounded-full w-fit mx-auto")}>
      <p className="text-sm font-medium">{statusText}</p>
    </div>
  );
};
