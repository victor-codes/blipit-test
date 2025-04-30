"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { logOut } from "@/services/auth";
import { ChevronRight, HelpCircle, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

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
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Jane Doe</p>
                <p className="text-sm text-gray-500">jane.doe@example.com</p>
              </div>
              {/* <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button> */}
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Phone Number</p>
                <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
              </div>
              {/* <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button> */}
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-500">
                  Last changed 30 days ago
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">
                  Enhance your account security
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card> */}

        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-between">
              Contact Support
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              FAQs
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Privacy Policy
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Button onClick={handleLogOut} variant="outline" className="w-full">
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </>
  );
}
