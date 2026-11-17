import { createFileRoute } from "@tanstack/react-router";
import { SignInGate } from "@/components/SignInGate";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Amanah" },
      {
        name: "description",
        content: "Log in as a student, parent, or educator to access Amanah.",
      },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  return <SignInGate />;
}
