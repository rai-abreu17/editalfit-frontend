import { AuthShell } from "@/components/AuthShell";
import { ResetForm } from "@/components/auth/ResetForm";

export default function RedefinirSenhaPage() {
  return (
    <AuthShell
      stageEyebrow="Quase lá"
      stageTitle="Uma senha forte protege seus projetos."
      stageSub="Depois de redefinir, você entra direto com a nova senha. Suas outras sessões serão encerradas."
    >
      <ResetForm />
    </AuthShell>
  );
}
