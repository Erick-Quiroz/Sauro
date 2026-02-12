"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Rol, CreateRolDTO, RolPermisos } from "../rol.types";
import { useState, useEffect } from "react";

const modulos = [
  { key: "categorias", label: "Categorías" },
  { key: "articulos", label: "Artículos" },
  { key: "roles", label: "Roles" },
  { key: "usuarios", label: "Usuarios" },
];

const acciones = [
  { key: "crear", label: "Crear" },
  { key: "leer", label: "Leer" },
  { key: "editar", label: "Editar" },
  { key: "eliminar", label: "Eliminar" },
];

export interface RolFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CreateRolDTO) => void;
  editingRol: Rol | null;
}

export function RolFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingRol,
}: RolFormModalProps) {
  const [nombre, setNombre] = useState("");
  const [activo, setActivo] = useState(true);
  const [permisos, setPermisos] = useState<RolPermisos>({
    categorias: { crear: false, leer: false, editar: false, eliminar: false },
    articulos: { crear: false, leer: false, editar: false, eliminar: false },
    roles: { crear: false, leer: false, editar: false, eliminar: false },
    usuarios: { crear: false, leer: false, editar: false, eliminar: false },
  });

  useEffect(() => {
    if (isOpen) {
      if (editingRol) {
        setNombre(editingRol.nombre || "");
        setActivo(editingRol.activo !== false);
        setPermisos(
          editingRol.permisos || {
            categorias: {
              crear: false,
              leer: false,
              editar: false,
              eliminar: false,
            },
            articulos: {
              crear: false,
              leer: false,
              editar: false,
              eliminar: false,
            },
            roles: {
              crear: false,
              leer: false,
              editar: false,
              eliminar: false,
            },
            usuarios: {
              crear: false,
              leer: false,
              editar: false,
              eliminar: false,
            },
          },
        );
      } else {
        setNombre("");
        setActivo(true);
        setPermisos({
          categorias: {
            crear: false,
            leer: false,
            editar: false,
            eliminar: false,
          },
          articulos: {
            crear: false,
            leer: false,
            editar: false,
            eliminar: false,
          },
          roles: { crear: false, leer: false, editar: false, eliminar: false },
          usuarios: {
            crear: false,
            leer: false,
            editar: false,
            eliminar: false,
          },
        });
      }
    }
  }, [editingRol, isOpen]);

  const handlePermisoChange = (
    modulo: string,
    accion: string,
    checked: boolean,
  ) => {
    setPermisos((prev) => ({
      ...prev,
      [modulo]: {
        ...prev[modulo as keyof RolPermisos],
        [accion]: checked,
      },
    }));
  };

  const handleSelectAll = (modulo: string, checked: boolean) => {
    setPermisos((prev) => ({
      ...prev,
      [modulo]: {
        crear: checked,
        leer: checked,
        editar: checked,
        eliminar: checked,
      },
    }));
  };

  const handleSubmit = () => {
    if (!nombre.trim()) {
      alert("Por favor, ingresa un nombre para el rol");
      return;
    }

    const submitData: CreateRolDTO = {
      nombre: nombre.trim(),
      permisos,
      activo,
    };

    onSubmit(submitData);
  };

  const handleClose = () => {
    setNombre("");
    setActivo(true);
    setPermisos({
      categorias: { crear: false, leer: false, editar: false, eliminar: false },
      articulos: { crear: false, leer: false, editar: false, eliminar: false },
      roles: { crear: false, leer: false, editar: false, eliminar: false },
      usuarios: { crear: false, leer: false, editar: false, eliminar: false },
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 my-8 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {editingRol ? "Editar Rol" : "Crear Nuevo Rol"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Define el nombre del rol y sus permisos
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Rol <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ej: Editor, Administrador..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Permisos por Módulo
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Módulo
                    </th>
                    {acciones.map((accion) => (
                      <th
                        key={accion.key}
                        className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {accion.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Todos
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {modulos.map((modulo) => {
                    const moduloPermisos =
                      permisos[modulo.key as keyof RolPermisos];
                    const allChecked =
                      moduloPermisos?.crear &&
                      moduloPermisos?.leer &&
                      moduloPermisos?.editar &&
                      moduloPermisos?.eliminar;

                    return (
                      <tr key={modulo.key} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {modulo.label}
                        </td>
                        {acciones.map((accion) => (
                          <td
                            key={accion.key}
                            className="px-4 py-3 text-center"
                          >
                            <Checkbox
                              checked={
                                moduloPermisos?.[
                                  accion.key as keyof typeof moduloPermisos
                                ] || false
                              }
                              onCheckedChange={(checked) =>
                                handlePermisoChange(
                                  modulo.key,
                                  accion.key,
                                  checked as boolean,
                                )
                              }
                            />
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center">
                          <Checkbox
                            checked={allChecked}
                            onCheckedChange={(checked) =>
                              handleSelectAll(modulo.key, checked as boolean)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selecciona los permisos específicos para cada módulo del sistema
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Estado del Rol
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
            {editingRol ? "Actualizar Rol" : "Crear Rol"}
          </Button>
        </div>
      </div>
    </div>
  );
}
