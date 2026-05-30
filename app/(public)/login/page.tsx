import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  const { reset } = await searchParams;
  return (
    <AuthShell
      stageEyebrow="Bem-vindo de volta"
      stageTitle="Seus diagnósticos te esperam."
      stageSub="Retome os projetos salvos, veja a evolução do score e descubra novos editais que combinam com você."
    >
      <LoginForm successMessage={reset ? "Senha redefinida com sucesso." : undefined} />
    </AuthShell>
  );
}
