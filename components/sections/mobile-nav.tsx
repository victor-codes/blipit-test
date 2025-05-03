import { cn, NAVIGATION_LIST } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const MobileNav = () => {
  const pathname = usePathname();
  return (
    <div>
      <nav className=" relative block md:hidden h-16 w-full  md:max-w-md bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around items-center h-16">
          {NAVIGATION_LIST.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full",
                  isActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-secondary-foreground"
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
  );
};
