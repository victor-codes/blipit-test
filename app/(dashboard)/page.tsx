"use client";
import Link from "next/link";
import { withAuth } from "@/components/hoc/withAuth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, CreditCard, Activity } from "lucide-react";
import { useDashboard } from "@/contexts/dashboardContext";

function Dashboard() {
  const { user } = useDashboard();

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
              <p className="text-4xl font-bold">$1,250.00 USD</p>
              <div className="flex space-x-2">
                <Button size="lg" asChild className="flex-1">
                  <Link href="/deposit">
                    <Plus className="mr-2 h-4 w-4" />
                    Deposit
                  </Link>
                </Button>
                <Button size="lg" asChild variant="outline" className="flex-1">
                  <Link href="/withdraw">
                    <Minus className="mr-2 h-4 w-4" />
                    Withdraw
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/create-card-wallet"
              className="flex flex-col items-center justify-center border rounded-md py-4 shadow-xs"
            >
              <CreditCard className="h-8 w-8 mb-2" />
              Create Card Wallet
            </Link>

            <Link
              href="/activity"
              className="flex flex-col items-center justify-center border rounded-md py-4 shadow-xs"
            >
              <Activity className="h-8 w-8 mb-2" />
              View Transactions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
