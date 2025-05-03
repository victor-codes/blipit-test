import { Skeleton } from "@/components/ui/skeleton";
import { TransactionsLoading } from "@/components/ui/transaction-item";

export const CardPageSkeletion = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 " />
      <Skeleton className="aspect-[1.875] rounded-xl" />
      <div className="flex gap-3 mx-auto">
        <Skeleton className="h-16 flex-1" />
        <Skeleton className="h-16 flex-1" />
        <Skeleton className="h-16 flex-1" />
      </div>

      <TransactionsLoading num={4} />
    </div>
  );
};
