"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { login, logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from") ?? "/";

  return (
    <section className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Iniciar sesión (demo)</h1>
      <p className="text-sm text-muted-foreground">
        Simulación de login para la demo del curso.
      </p>

      <div className="grid gap-2">
        <Button
          className="w-full"
          onClick={() => {
            login();
            toast.success("Has iniciado sesión correctamente");
            router.replace(from);
          }}
        >
          Iniciar sesión de prueba
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            logout();
            toast("Sesión cerrada");
            // Nos quedamos en login y limpiamos el ?from para que no confunda
            router.replace("/login");
          }}
        >
          Cerrar sesión (demo)
        </Button>
      </div>
    </section>
  );
}

