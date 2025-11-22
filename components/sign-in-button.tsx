"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SignInButton() {
  const { data: session, isPending } = authClient.useSession();
  const [githubPending, startGithubTransition] = useTransition();
  function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("You have successfully signed in with Github");
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        },
      });
    });
  }

  const handleSignOut = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("You have successfully signed out");
        },
        onError: () => {
          toast.error("Something went wrong while signing out");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="w-32 flex justify-center">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex gap-4 items-center">
        <p className="text-sm font-medium">
          Signed in as {session.user.name || "User"}
        </p>
        <Button onClick={handleSignOut} variant="outline" size="sm">
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className="w-32 flex items-center justify-center">
      <Button disabled={githubPending} onClick={signInWithGithub} size="sm">
        {githubPending ? "Signing in..." : "Sign in with Github"}
      </Button>
    </div>
  );
}
