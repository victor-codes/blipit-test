"use client";
import { cn } from "@/lib/utils";
import { Home, Activity, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { withAuth } from "../hoc/withAuth";

const Content = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="pt-10 px-4 pb-0">
      <div className="max-w-md mx-auto">
        <div className="flex-1 pb-16">{children}</div>

        <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full  max-w-md bg-white border-t border-gray-200 z-10">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full",
                    isActive
                      ? "text-primary"
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

const DashboardContent = withAuth(Content);

export default DashboardContent;

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  // { icon: CreditCard, label: "Cards", href: "/dashboard/cards" },
  { icon: Activity, label: "Activity", href: "/activity" },
  { icon: Settings, label: "Settings", href: "/settings" },
];
