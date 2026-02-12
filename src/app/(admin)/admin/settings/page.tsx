"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Save } from "lucide-react";
import { useToast, ToastContainer } from "@/components";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const { toasts, showToast, removeToast } = useToast();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setApellido(user.apellido);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    showToast("Perfil actualizado exitosamente", "success");
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }
    showToast("Contraseña actualizada exitosamente", "success");
  };

  const getInitials = () => {
    if (!user) return "US";
    return `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-500 mt-1">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div>
        <h1 className="text-4xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500 mt-1">Gestiona tu perfil y preferencias</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Información de Perfil
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido
                </label>
                <Input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline">Cancelar</Button>
              <Button
                onClick={handleSaveProfile}
                className="bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold"
              >
                <Save size={18} className="mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </Card>

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
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-sauro-gray-light border-gray-300"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline">Cancelar</Button>
              <Button
                onClick={handleUpdatePassword}
                className="bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold"
              >
                <Save size={18} className="mr-2" />
                Actualizar Contraseña
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Información de Cuenta
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Rol</p>
                <p className="font-medium text-gray-900">
                  {user?.rol || "Usuario"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Se unió</p>
                <p className="font-medium text-gray-900">
                  {formatDate(new Date())}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Última actividad</p>
                <p className="font-medium text-gray-900">Ahora</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
