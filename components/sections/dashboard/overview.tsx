import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/contexts/dashboard-context";
import { useWallets } from "@/contexts/wallets-context";
import { AMOUNT_PRECISION, DASHBOARD_SECTION } from "@/lib/contants";
import { balanceFormatter } from "@/lib/utils";
import { Plus, Wallet } from "lucide-react";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { RecentTransactions } from "../home/recent-transactions";
import Link from "next/link";
import { TransactionsLoading } from "@/components/ui/transaction-item";

type OverviewProps = {
  updateSection: (section: DASHBOARD_SECTION) => void;
};

export const Overview = ({ updateSection }: OverviewProps) => {
  const { user } = useDashboard();

  const { wallet, isFetchingWallet } = useWallets();

  const goToDeposit = () => updateSection(DASHBOARD_SECTION.DEPOSIT);
  const goToWithdraw = () => updateSection(DASHBOARD_SECTION.WITHDRAW);

  return (
    <>
      <PageHeader>Hello, {user!.first_name}!</PageHeader>

      <Card className="w-full gap-y-2">
        <CardHeader>
          <CardTitle className="text-accent-foreground">
            Main Wallet Balance
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col space-y-6">
            {isFetchingWallet ? (
              <Skeleton className="h-10" />
            ) : (
              <p className="text-4xl font-bold">
                {balanceFormatter(wallet?.balance! / AMOUNT_PRECISION || 0)}
              </p>
            )}
            <div className="flex space-x-2">
              <Button size="lg" onClick={goToDeposit} className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Deposit
              </Button>
              <Button
                size="lg"
                onClick={goToWithdraw}
                variant="outline"
                className="flex-1"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {!user?.card_id && (
        <Link
          href="/cards"
          className="relative overflow-hidden px-4 py-10 border rounded-xl "
        >
          <h3 className="font-medium">Get a Virtual Dollar Card</h3>
          <p className="text-sm text-accent-foreground">
            Shop anywhere across the globe
          </p>
          <div className="absolute transform rotate-35 bottom-8  -right-[13%] aspect-[1.7] bg-gradient-to-br from-violet-500/50 via-purple-500/50 to-pink-500/50 w-[216px] rounded-2xl" />
        </Link>
      )}

      <Suspense fallback={<TransactionsLoading num={4} />}>
        <RecentTransactions />
      </Suspense>
    </>
  );
};
