"use client";
import { withAuth } from "@/components/hoc/withAuth";
import Link from "next/link";

import { RecentTransactions } from "@/components/sections/home/recent-transactions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/contexts/dashboardContext";
import { useWallets } from "@/contexts/wallets-context";
import { AMOUNT_PRECISION } from "@/lib/contants";
import { balanceFormatter } from "@/lib/utils";
import { Minus, Plus, Wallet } from "lucide-react";
import { Suspense } from "react";

function Dashboard() {
  const { user } = useDashboard();

  const { wallet, fetchingWallets } = useWallets();

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hello, {user!.first_name}!</h1>
        </div>
        {/* Balance Card */}
        <Card className="w-full gap-y-2">
          <CardHeader>
            <CardTitle className="text-accent-foreground">
              Main Wallet Balance
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col space-y-6">
              {fetchingWallets ? (
                <Skeleton className="h-10" />
              ) : (
                <p className="text-4xl font-bold">
                  {balanceFormatter(wallet?.balance! / AMOUNT_PRECISION)}
                </p>
              )}
              <div className="flex space-x-2">
                <Button size="lg" asChild className="flex-1">
                  <Link href="/deposit">
                    <Plus className="mr-2 h-4 w-4" />
                    Deposit
                  </Link>
                </Button>
                <Button size="lg" asChild variant="outline" className="flex-1">
                  <Link href="/withdraw">
                    <Wallet className="mr-2 h-4 w-4" />
                    Withdraw
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Suspense fallback={<Skeleton className="h-10" />}>
          <RecentTransactions />
        </Suspense>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
