import { useDashboard } from "@/contexts/dashboardContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user, isInitializing } = useDashboard();
    const router = useRouter();

    useEffect(() => {
      if (!isInitializing && user && !user.completed_setup) {
        router.push("/setup");
      }
    }, [user, isInitializing, router]);

    if (isInitializing) {
      return (
        <div className="flex items-center justify-center w-full h-dvh">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!user?.first_name || !user?.last_name) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
