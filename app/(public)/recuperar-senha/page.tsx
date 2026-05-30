import { AuthShell } from "@/components/AuthShell";
import { ForgotForm } from "@/components/auth/ForgotForm";

export default function RecuperarSenhaPage() {
  return (
    <AuthShell
      stageEyebrow="Acesso seguro"
      stageTitle="Recupere o acesso em um minuto."
      stageSub="Enviamos um link de redefinição para o e-mail da sua conta. Por segurança, ele expira em 30 minutos."
    >
      <ForgotForm />
    </AuthShell>
  );
}
