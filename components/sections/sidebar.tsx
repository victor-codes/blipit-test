"use client";

import { siteConfig } from "@/lib/meta";
import { cn, NAVIGATION_LIST } from "@/lib/utils";
import {
  Activity,
  ChevronRight,
  CreditCard,
  Home,
  Settings,
  Sparkle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="hidden h-full md:fixed  w-full max-w-[20rem] md:flex md:flex-col border-r">
      <div className="flex h-full flex-col bg-card pt-4 pb-6 2xl:pb-10">
        <div className="flex h-16 items-center px-6 mb-10">
          <h1 className="text-2xl">{siteConfig.title}</h1>
        </div>

        <div className="flex-1 flex flex-col  space-y-8 md:space-y-20 px-4 py-4">
          <div />

          <nav className="md:space-y-1">
            {NAVIGATION_LIST.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-4 transition-colors hover:bg-accent hover:text-secondary-foreground",
                    pathname === item.href
                      ? "bg-accent text-secondary-foreground"
                      : "transparent",
                    { "bg-accent text-secondary-foreground": isMobile }
                  )}
                >
                  <div className="flex space-x-3 items-center">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
