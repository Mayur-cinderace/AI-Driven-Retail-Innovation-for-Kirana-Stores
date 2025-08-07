// src/lib/navigation.ts
import { LayoutDashboard, Users, Receipt, Gamepad2 } from "lucide-react";

export type NavigationItem = {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const navigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    href: "/customer",
    icon: Users,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: Receipt,
  },
  {
    title: "Try Your Luck",
    href: "/try",
    icon: Gamepad2,
  },
];
