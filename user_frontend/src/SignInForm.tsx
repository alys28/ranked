import { SignInMethodDivider } from "@/components/SignInMethodDivider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignInWithGoogle } from "@/SignInWithGoogle";
import { SignInFormPassword } from "./SignInFormPassword";

export function SignInForm() {
  const [step, setStep] = useState<"signIn" | "signUp" | "linkSent">("signIn");

  return (
    <div className="mt-8 flex items-center justify-center">
      <div className=" bg-white rounded-lg shadow-md p-8">
        {/* Product Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to ranked
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Your gateway to a better consumer experience
          </p>
        </div>

        {/* Sign In/Sign Up Form */}
        <div className="flex flex-col gap-6">
          {step === "signIn" || step === "signUp" ? (
            <>
              <h2 className="font-semibold text-lg text-center text-gray-800">
                {step === "signIn"
                  ? "Sign in or create an account"
                  : "Create a new account"}
              </h2>
              <SignInWithGoogle />
              <SignInMethodDivider />
              <SignInFormPassword />
            </>
          ) : (
            <>
              <h2 className="font-semibold text-xl text-gray-800">
                Check your email
              </h2>
              <p className="text-gray-600">
                A sign-in link has been sent to your email address. Please
                check your inbox and follow the link to continue.
              </p>
              <Button
                className="mt-4 text-blue-500 underline self-start"
                variant="link"
                onClick={() => setStep("signIn")}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
