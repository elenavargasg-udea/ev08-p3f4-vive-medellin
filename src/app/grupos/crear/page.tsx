import type { Metadata } from "next";
import FormCrearGrupo from "./FormCrearGrupo";
import AuthGuard from "@/components/AuthGuard"; // si usas guard

export const metadata: Metadata = {
  title: "Crear grupo",
};

export default function CrearGrupoPage() {
  return (
    <AuthGuard>
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Crear grupo</h1>
        <FormCrearGrupo />
      </main>
    </AuthGuard>
  );
}


