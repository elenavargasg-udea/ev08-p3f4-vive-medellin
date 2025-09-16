"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { toast } from "sonner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn()) {
      toast("Debes iniciar sesión para crear un grupo");
      const from = encodeURIComponent(pathname || "/");
      router.replace(`/login?from=${from}`);
    }
  }, [router, pathname]);

  return isLoggedIn() ? <>{children}</> : null;
}
