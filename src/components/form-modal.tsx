"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  fields: FormField[];
  isLoading?: boolean;
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "select" | "toggle" | "file";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: any;
}

export function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  isLoading = false,
}: FormModalProps) {
  const initialFormData = useMemo(() => {
    const initial: Record<string, any> = {};
    fields.forEach((field) => {
      // Usar defaultValue si está definido, incluyendo valores falsy como false, 0, ""
      initial[field.name] =
        field.defaultValue !== undefined ? field.defaultValue : "";
    });
    return initial;
  }, [fields]);

  const [formData, setFormData] =
    useState<Record<string, any>>(initialFormData);

  useEffect(() => {
    // Sincronizar el estado interno cuando se abre el modal o cambian los valores iniciales
    setFormData(initialFormData);
  }, [initialFormData, isOpen]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-sauro-red">*</span>}
                </label>

                {field.type === "toggle" ? (
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleChange(field.name, !formData[field.name])
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData[field.name] ? "bg-sauro-green" : "bg-gray-800"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData[field.name]
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span
                      className={`text-sm font-medium ${
                        formData[field.name]
                          ? "text-sauro-green"
                          : "text-gray-800"
                      }`}
                    >
                      {formData[field.name] ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                ) : field.type === "select" ? (
                  <Select
                    value={formData[field.name] || ""}
                    onValueChange={(value) => handleChange(field.name, value)}
                  >
                    <SelectTrigger className="bg-sauro-gray-light border-gray-300">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "file" ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sauro-green transition">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleChange(field.name, file);
                        }
                      }}
                      className="hidden"
                      id={field.name}
                    />
                    <label
                      htmlFor={field.name}
                      className="cursor-pointer text-sm text-gray-600"
                    >
                      {formData[field.name]?.name || "Haz clic para cargar"}
                    </label>
                  </div>
                ) : (
                  <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className="bg-sauro-gray-light border-gray-300"
                  />
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
