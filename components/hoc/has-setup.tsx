"use client";
import { useDashboard } from "@/contexts/dashboard-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function hasSetup<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function HasSetupComponent(props: P) {
    const { user, isInitializing } = useDashboard();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
      if (!isInitializing && user?.completed_setup) {
        if (pathname === "/setup") {
          router.replace("/");
        }
      }
    }, [user, isInitializing, pathname]);

    if (isInitializing) {
      return null;
    }

    if (user && !user.completed_setup) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}
