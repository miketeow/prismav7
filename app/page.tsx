import { SignInButton } from "@/components/sign-in-button";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 container mx-auto px-4">
      <div>Home Page</div>
      <SignInButton />
    </div>
  );
}
