"use client";
import { useDashboard } from "@/contexts/dashboard-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageSkeletion } from "../ui/page";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user, isInitializing } = useDashboard();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
      if (!isInitializing && user && !user.completed_setup) {
        router.push("/setup");
      }
      if (
        !isInitializing &&
        user &&
        pathname === "/setup" &&
        user?.completed_setup
      ) {
        console.log("User completed setup");

        router.replace("/");
      }
    }, [user, isInitializing, router]);

    if (isInitializing) {
      return <PageSkeletion />;
    }

    if (!user?.first_name || !user?.last_name) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
