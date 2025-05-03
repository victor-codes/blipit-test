"use client";
import { withAuth } from "../hoc/with-auth";
import { PageWrapper } from "../ui/page";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:grid md:grid-cols-[20rem_1fr] h-[100dvh] bg-background">
      <div>
        <Sidebar />
      </div>

      <div className="flex flex-col md:py-10 h-full">
        <main className="flex-1 px-5 py-6 md:max-w-md w-full mx-auto overflow-auto">
          <PageWrapper>{children}</PageWrapper>
        </main>
        <MobileNav />
      </div>
    </div>
  );
};

const DashboardContent = withAuth(Content);

export default DashboardContent;
