"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const categorias = [
    "Arte",
    "Cultura",
    "Deporte",
    "Medio ambiente",
    "Idiomas",
    "Educación",
    "Otro",
] as const satisfies readonly [string, ...string[]];

export const privacidadValues = [
    "publico",
    "privado",
] as const satisfies readonly [string, ...string[]];

const Schema = z
    .object({
        nombre: z
            .string()
            .min(1, { message: "El nombre es obligatorio" })
            .max(60, { message: "Máximo 60 caracteres" }),

        descripcion: z
            .string()
            .max(5000, { message: "Máximo 5000 caracteres" })
            .optional()
            .or(z.literal("")),

        categoria: z.enum(categorias, {
            message: "Selecciona una categoría",
        }),

        nombreCategoriaOtro: z
            .string()
            .max(20, { message: "Máximo 20 caracteres" })
            .optional()
            .or(z.literal("")),

        privacidad: z.enum(privacidadValues, {
            message: "Selecciona la privacidad",
        }),
        aceptaReglas: z.boolean().refine((v) => v === true, {
            message: "Debes aceptar las reglas de participación",
        }),
    })
    .refine(
        (d) =>
            d.categoria !== "Otro" ||
            (d.nombreCategoriaOtro?.trim().length ?? 0) > 0,
        {
            path: ["nombreCategoriaOtro"],
            message: "Escribe el nombre de la categoría",
        }
    );

type FormData = z.infer<typeof Schema>;

export default function FormCrearGrupo() {
    const form = useForm<FormData>({
        resolver: zodResolver(Schema),
        defaultValues: {
            nombre: "",
            descripcion: "",
            categoria: undefined as unknown as FormData["categoria"],
            nombreCategoriaOtro: "",
            privacidad: undefined as unknown as FormData["privacidad"],
            aceptaReglas: false,
        },
        mode: "onTouched",
    });

    const onSubmit = async (data: FormData) => {
        try {
            // Simula llamada a API (para demo del curso)
            await new Promise((res, rej) =>
                setTimeout(() => {
                    Math.random() < 0.9 ? res(true) : rej(new Error("tech"));
                }, 700)
            );
            toast.success("¡El grupo se ha creado correctamente!");
            form.reset();
        } catch {
            toast.error(
                "Hubo un error técnico al procesar tu solicitud. No se pudo crear el grupo. Por favor, inténtalo nuevamente más tarde."
            );
        }
    };

    const watchCategoria = form.watch("categoria");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
                {/* Nombre */}
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Nombre del grupo <span aria-hidden="true" className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Ej. Amantes del cine independiente" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Descripción */}
                <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción (opcional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={4}
                                    placeholder="Propósito del grupo, características e intereses…"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Categoría */}
                <FormField
                    control={form.control}
                    name="categoria"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Categoría <span aria-hidden="true" className="text-red-600">*</span>
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger aria-label="Selecciona una categoría">
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categorias.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Si categoría = Otro → Campo nombreCategoriaOtro */}
                {form.watch("categoria") === "Otro" && (
                    <FormField
                        control={form.control}
                        name="nombreCategoriaOtro"
                        render={({ field }) => (
                            <FormItem className="mt-3">
                                <FormLabel>Nombre de la categoría</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. Gastronomía" maxLength={20} {...field} />
                                </FormControl>
                                <FormDescription>Máximo 20 caracteres.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* Privacidad */}
                <FormField
                    control={form.control}
                    name="privacidad"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Privacidad <span aria-hidden="true" className="text-red-600">*</span>
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger aria-label="Selecciona la privacidad">
                                        <SelectValue placeholder="Selecciona privacidad" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="publico">Público</SelectItem>
                                    <SelectItem value="privado">Privado</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Reglas de participación (checklist + aceptación) */}
                <div className="rounded-lg border p-3 text-sm bg-muted/20">
                    <p className="font-medium mb-2">Reglas de participación</p>
                    <ol className="list-decimal ml-5 space-y-1">
                        <li>No se permiten comentarios violentos, agresivos, ni discriminación.</li>
                        <li>No publicar material ofensivo, violento, sexual explícito o que incite al odio.</li>
                        <li>Los aportes deben estar relacionados con el tema del grupo.</li>
                        <li>No compartir información personal de otros miembros sin su consentimiento.</li>
                        <li>
                            No difundir datos exclusivos (ej: actividades que no deben hacerse públicas,
                            conversaciones entre miembros, documentos compartidos solo para los integrantes) del grupo en otra plataforma.
                        </li>
                        <li>Participar activamente en proyectos, discusiones y eventos del grupo.</li>
                    </ol>

                    <FormField
                        control={form.control}
                        name="aceptaReglas"
                        render={({ field }) => (
                            <FormItem className="mt-3 flex items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}                    // ahora es boolean
                                        onCheckedChange={(v) => field.onChange(!!v)} // convierte CheckedState -> boolean
                                        aria-describedby="reglas-ayuda"
                                    />
                                </FormControl>
                                <FormLabel className="m-0">
                                    Acepto cumplir todas las reglas de participación.
                                    <span className="text-red-600"> *</span>
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-3">
                    <Button type="submit">Crear grupo</Button>
                    <Button type="button" variant="secondary" onClick={() => form.reset()}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    );
}
