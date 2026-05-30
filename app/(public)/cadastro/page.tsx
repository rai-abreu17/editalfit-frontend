import { AuthShell } from "@/components/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export default function CadastroPage() {
  return (
    <AuthShell>
      <SignupForm />
    </AuthShell>
  );
}
