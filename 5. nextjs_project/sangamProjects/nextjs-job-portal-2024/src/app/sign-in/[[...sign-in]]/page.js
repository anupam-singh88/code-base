'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SignIn } from "@clerk/nextjs";
import { CopyCheckIcon } from "lucide-react";

export default function SignInPage() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => { },
      (err) => console.error("Failed to copy text: ", err)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <SignIn />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-2 shadow-lg" size="lg">
            Get Dummy Credentials
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader />
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="name" className="text-right">
                Email: user1@gmail.com
              </Label>
              <Button
                variant="ghost"
                className="ml-2"
                onClick={() => copyToClipboard("user1@gmail.com")}
              >
                <CopyCheckIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-right">
                Password: 1234
              </Label>
              <Button
                variant="ghost"
                className="ml-2"
                onClick={() => copyToClipboard("1234")}
              >
                <CopyCheckIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="name" className="text-right">
                Email: recruiter1@gmail.com
              </Label>
              <Button
                variant="ghost"
                className="ml-2"
                onClick={() => copyToClipboard("recruiter1@gmail.com")}
              >
                <CopyCheckIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-right">
                Password: 1234
              </Label>
              <Button
                variant="ghost"
                className="ml-2"
                onClick={() => copyToClipboard("1234")}
              >
                <CopyCheckIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
