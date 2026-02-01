"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500 mt-1">Gestiona tu perfil y preferencias</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="col-span-2 space-y-6">
          {/* Perfil */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Información de Perfil
            </h2>
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="mb-2">
                  Cambiar Foto
                </Button>
                <p className="text-sm text-gray-500">
                  JPG, GIF o PNG. Máximo 5MB
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <Input
                  type="text"
                  defaultValue="Juan"
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido
                </label>
                <Input
                  type="text"
                  defaultValue="Pérez"
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  defaultValue="juan.perez@example.com"
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold">
                <Save size={18} className="mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </Card>

          {/* Seguridad */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Seguridad
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña Actual
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nueva Contraseña
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold">
                <Save size={18} className="mr-2" />
                Actualizar Contraseña
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Info */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Información de Cuenta
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Rol</p>
                <p className="font-medium text-gray-900">Administrador</p>
              </div>
              <div>
                <p className="text-gray-500">Se unió</p>
                <p className="font-medium text-gray-900">10 de enero de 2025</p>
              </div>
              <div>
                <p className="text-gray-500">Última actividad</p>
                <p className="font-medium text-gray-900">Hace 2 minutos</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
