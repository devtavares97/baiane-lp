"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/admin/auth";
import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Não verificar autenticação na página de login
    if (pathname === "/admin/login") return;

    if (!isAuthenticated()) {
      router.push("/admin/login");
    }
  }, [router, pathname]);

  // Não mostrar sidebar na página de login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Não renderizar nada até verificar autenticação
  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main 
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}
      >
        {children}
      </main>
    </div>
  );
}
