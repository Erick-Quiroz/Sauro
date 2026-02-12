"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Articulo, CreateArticuloDTO } from "../articulo.types";
import { useState, useEffect } from "react";

const categoriasOptions = [
  { value: "tecnologia", label: "Tecnología" },
  { value: "negocios", label: "Negocios" },
  { value: "marketing", label: "Marketing" },
];

export interface ArticuloEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CreateArticuloDTO) => void;
  editingArticulo: Articulo | null;
}

export function ArticuloEditModal({
  isOpen,
  onClose,
  onSubmit,
  editingArticulo,
}: ArticuloEditModalProps) {
  const [titulo, setTitulo] = useState("");
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (editingArticulo) {
      setTitulo(editingArticulo.titulo || "");
      setActivo(editingArticulo.activo === true);
    }
  }, [editingArticulo, isOpen]);

  const handleSubmit = () => {
    if (!titulo.trim()) {
      alert("Por favor, ingresa un título");
      return;
    }

    const submitData: CreateArticuloDTO = {
      titulo,
      activo,
    };

    onSubmit(submitData);
    handleClose();
  };

  const handleClose = () => {
    setTitulo("");
    setActivo(true);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Editar Artículo
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Modifica los detalles de tu artículo
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Mi nuevo artículo..."
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Estado
              </label>
              <button
                onClick={() => setActivo(!activo)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  activo ? "bg-sauro-green" : "bg-gray-800"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    activo ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  activo ? "text-sauro-green" : "text-gray-800"
                }`}
              >
                {activo ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold"
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
