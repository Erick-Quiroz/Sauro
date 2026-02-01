"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast, ToastContainer } from "@/components";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Por favor completa todos los campos", "error");
      return;
    }

    setIsLoading(true);

    // Simular login
    setTimeout(() => {
      if (email === "demo@sauro.com" && password === "demo") {
        showToast("Bienvenido a SAURO SOFTWARE", "success");
        // En una app real, guardarías el token y redireccionarías a /admin
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1500);
      } else {
        showToast("Credenciales inválidas", "error");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-sauro-gray-light flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-lg bg-sauro-green flex items-center justify-center">
              <span className="text-4xl">🦎</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SAURO SOFTWARE</h1>
          <p className="text-gray-500">Panel de Administración</p>
        </div>

        {/* Login Card */}
        <Card className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-sauro-gray-light border-gray-300"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Credenciales de demo: demo@sauro.com
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-sauro-gray-light border-gray-300"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Contraseña de demo: demo
              </p>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-sauro-green" />
                <span className="text-sm text-gray-700">Recuérdame</span>
              </label>
              <Link
                href="#"
                className="text-sm text-sauro-green hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-sauro-green hover:bg-sauro-green/90 text-black font-semibold py-2 h-10"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Esta es una demo. Usa las credenciales: demo@sauro.com / demo
        </p>

        {/* Additional Links */}
        <div className="grid grid-cols-2 gap-4 text-center text-xs text-gray-500">
          <Link href="#" className="hover:text-sauro-green">
            Centro de Ayuda
          </Link>
          <Link href="#" className="hover:text-sauro-green">
            Privacidad
          </Link>
          <Link href="#" className="hover:text-sauro-green">
            Términos
          </Link>
          <Link href="#" className="hover:text-sauro-green">
            Contacto
          </Link>
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
