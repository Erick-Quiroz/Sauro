"use client";

import { Suspense, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BlockNoteEditor } from "@/modules/articulos/ui/BlockNoteEditor";
import { ArticleMetadataPanel } from "@/modules/articulos/ui/ArticleMetadataPanel";
import { useToast, ToastContainer } from "@/components";

function ArticuloEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articuloId = searchParams.get("id");
  const isNew = !articuloId;
  const { toasts, showToast, removeToast } = useToast();

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [contenido, setContenido] = useState("");
  const [activo, setActivo] = useState(true);
  const [esPrivado, setEsPrivado] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!titulo.trim()) {
      showToast("Por favor, ingresa un título", "error");
      return;
    }
    if (!categoria) {
      showToast("Por favor, selecciona una categoría", "error");
      return;
    }

    try {
      setIsSaving(true);

      const articuloData = {
        titulo: titulo.trim(),
        id_categoria: categoria,
        contenido: contenido ? JSON.parse(contenido) : {},
        activo,
        es_privado: esPrivado,
      };

      const url = isNew
        ? "/api/v1/articulos"
        : `/api/v1/articulos/${articuloId}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articuloData),
      });

      const json = await response.json();

      if (json.success) {
        showToast(
          `✓ Artículo "${titulo}" ${isNew ? "creado" : "actualizado"} correctamente`,
          "success",
        );
        sessionStorage.removeItem("articulo_borrador");
        setTimeout(() => {
          router.push("/admin/articulos");
        }, 1500);
      } else {
        showToast(
          json.error?.message || "Error al guardar el artículo",
          "error",
        );
      }
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Error al guardar el artículo",
        "error",
      );
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (articuloId) {
        try {
          const response = await fetch(`/api/v1/articulos/${articuloId}`);
          const json = await response.json();

          if (json.success) {
            const articulo = json.data;
            setTitulo(articulo.titulo || "");
            setCategoria(articulo.id_categoria?.toString() || "");
            setContenido(
              articulo.contenido ? JSON.stringify(articulo.contenido) : "",
            );
            setActivo(articulo.activo !== false);
            setEsPrivado(articulo.es_privado === true);
          }
        } catch (error) {
          showToast("Error al cargar el artículo", "error");
        }
      } else {
        const borrador = sessionStorage.getItem("articulo_borrador");
        if (borrador) {
          try {
            const datos = JSON.parse(borrador);
            if (datos.titulo) setTitulo(datos.titulo);
            if (datos.activo !== undefined) setActivo(datos.activo);
            if (datos.es_privado !== undefined) setEsPrivado(datos.es_privado);
            if (datos.categoria) setCategoria(datos.categoria);
          } catch (error) {}
        }
      }
      setLoaded(true);
    };

    loadData();
  }, [articuloId]);

  return (
    <>
      {!loaded ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sauro-green mb-4"></div>
            <p className="text-gray-600">Cargando editor...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/admin/articulos">
                <Button variant="outline" size="sm">
                  <ArrowLeft size={18} />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isNew ? "Crear Artículo" : "Editar Artículo"}
                </h1>
                <p className="text-gray-500 mt-1">
                  Crea y personaliza tu contenido
                </p>
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold disabled:opacity-50"
            >
              <Save size={18} className="mr-2" />
              {isSaving
                ? isNew
                  ? "Guardando..."
                  : "Actualizando..."
                : isNew
                  ? "Guardar Artículo"
                  : "Actualizar Artículo"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <Card className="p-6 border-2 border-sauro-green/20">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Título del Artículo{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Ej: Introducción a React 19..."
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="text-2xl font-bold border-gray-300 focus:ring-sauro-green"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Escribe un título atractivo y descriptivo para tu artículo
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Contenido del Artículo
                    </label>
                    <BlockNoteEditor
                      value={contenido}
                      onChange={setContenido}
                      placeholder="Comienza a escribir tu artículo aquí..."
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Usa la barra de herramientas para dar formato a tu
                    contenido. Puedes agregar títulos, listas, imágenes y más.
                  </p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <ArticleMetadataPanel
                  categoria={categoria}
                  onCategoriaChange={setCategoria}
                  esPrivado={esPrivado}
                  onEsPrivadoChange={setEsPrivado}
                  activo={activo}
                  onActivoChange={setActivo}
                />

                <Card className="p-4">
                  <Button
                    variant="outline"
                    className="w-full hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Eye size={16} className="mr-2" />
                    Vista Previa
                  </Button>
                </Card>
              </div>
            </div>

            <ToastContainer toasts={toasts} onRemove={removeToast} />
          </div>
        </div>
      )}
    </>
  );
}

export default function ArticuloEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sauro-green mb-4"></div>
            <p className="text-gray-600">Cargando editor...</p>
          </div>
        </div>
      }
    >
      <ArticuloEditorContent />
    </Suspense>
  );
}
