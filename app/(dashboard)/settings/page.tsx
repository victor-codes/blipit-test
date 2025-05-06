"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page";
import { SettingsItem, SettingsSection } from "@/components/ui/settings";
import { useDashboard } from "@/contexts/dashboard-context";
import { logOut } from "@/services/auth";
import { HelpCircle, LogOut, MessageCircle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPhoneNumberIntl } from "react-phone-number-input";

export default function Settings() {
  const router = useRouter();
  const { user } = useDashboard();

  const handleLogOut = async () => {
    try {
      await logOut();
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader>Settings</PageHeader>

      <SettingsSection title="Account">
        <SettingsItem
          title="Name"
          value={`${user?.first_name} ${user?.last_name}`}
        />

        <SettingsItem title="Email" value={user?.email} />
        <SettingsItem
          title="Phone Number"
          value={maskPhoneNumber(user?.phone_number!)}
        />
      </SettingsSection>

      <SettingsSection title="Support">
        <SettingsItem title="Help center" icon={<HelpCircle />} />
        <SettingsItem title="Contact support" icon={<MessageCircle />} />
        <SettingsItem title="Give feedback" icon={<Star />} />
      </SettingsSection>

      <div className="pt-6">
        <Button onClick={handleLogOut} variant="outline" className="w-full">
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </>
  );
}

const maskPhoneNumber = (phone: string): string => {
  const formatted = formatPhoneNumberIntl(phone) || "";
  const digitsOnly = formatted.replace(/\D/g, "");
  const lastTwo = digitsOnly.slice(-2);

  return `•••• ••• ••${lastTwo}`;
};
