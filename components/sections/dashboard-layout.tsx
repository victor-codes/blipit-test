"use client";
import { withAuth } from "../hoc/with-auth";
import { PageWrapper } from "../ui/page";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:grid md:grid-cols-[15rem_1fr_1rem] min-xl:grid-cols-[20rem_1fr_20rem] h-[100dvh] bg-background no-scrollbar">
      <div>
        <Sidebar />
      </div>

      <div className="flex flex-col md:py-10 h-full ">
        <div className="flex-1 flex flex-col px-5 h-full overflow-auto">
          <main className="flex-1 py-6 md:max-w-md w-full mx-auto ">
            <PageWrapper>{children}</PageWrapper>
          </main>
        </div>
        <MobileNav />
      </div>
    </div>
  );
};

const DashboardContent = withAuth(Content);

export default DashboardContent;
