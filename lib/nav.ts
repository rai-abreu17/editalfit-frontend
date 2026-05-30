import type { ComponentType, SVGProps } from "react";
import { IconHome, IconSparkles, IconDoc, IconGear, IconCap } from "@/components/icons";

export interface NavItem {
  href: string;
  label: string;
  short: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const NAV: NavItem[] = [
  { href: "/inicio", label: "Início", short: "Início", icon: IconHome },
  { href: "/match", label: "Match de editais", short: "Match", icon: IconSparkles },
  { href: "/aprender", label: "Aprender editais", short: "Trilha", icon: IconCap },
  { href: "/modelos", label: "Modelos de documentos", short: "Modelos", icon: IconDoc },
  { href: "/configuracoes", label: "Configurações", short: "Conta", icon: IconGear },
];
