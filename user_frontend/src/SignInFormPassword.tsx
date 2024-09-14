import { SignInWithPassword } from "./SignInWithPassword";
import { Toaster } from "@/components/ui/toaster";

export function SignInFormPassword() {
  return (
    <div className="max-w-[384px] mx-auto flex flex-col gap-4">
      <SignInWithPassword />
      <Toaster />
    </div>
  );
}