import { TransactionsLoading } from "@/components/ui/transaction-item";
import { Skeleton } from "@/components/ui/skeleton";

export const PageHeader = ({ children }: React.ComponentProps<"button">) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{children}</h1>
    </div>
  );
};

export const PageWrapper = ({ children }: React.ComponentProps<"button">) => {
  return <div className="flex flex-col space-y-6 h-full ">{children}</div>;
};

export const PageSkeletion = () => {
  return (
    <div className="md:grid md:grid-cols-[15rem_1fr_1rem] min-xl:grid-cols-[20rem_1fr_20rem] h-[100dvh] bg-background no-scrollbar">
      <div className="hidden h-full w-full max-w-[20rem] md:flex md:flex-col px-4 border-r z-50">
        <div className="pt-16">
          <Skeleton className="h-8 mb-10 w-3/5" />
        </div>

        <div className="flex-1 flex flex-col  space-y-8 md:space-y-20 py-4">
          <div />

          <div className="md:space-y-1">
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:py-10 h-full overflow-auto">
        <div className="flex-1 flex flex-col px-5">
          <main className="flex-1 py-6 md:max-w-md w-full mx-auto ">
            <PageWrapper>
              <div className="space-y-6">
                <Skeleton className="h-8 " />
                <Skeleton className="aspect-[1.875] rounded-xl" />

                <TransactionsLoading num={4} />
              </div>
            </PageWrapper>
          </main>
        </div>

        <div className="block md:hidden h-16 w-full  md:max-w-md">
          <div className="flex items-center gap-3 mx-auto px-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
