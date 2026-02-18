"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast, ToastContainer } from "@/components";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
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

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(`Bienvenido ${data.data.user.nombre}!`, "success");

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 500);
      } else {
        showToast(data.error || "Credenciales inválidas", "error");
        setIsLoading(false);
      }
    } catch (error) {
      showToast("Error al iniciar sesión. Intenta nuevamente.", "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-[45%] bg-sauro-green relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-8 left-8 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/4 right-12 w-16 h-16 bg-white/15 rounded-full"></div>
        <div className="absolute bottom-1/4 left-16 w-12 h-12 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-12 right-20 w-24 h-24 bg-white/10 rounded-full"></div>

        <div className="absolute top-20 right-1/4 w-8 h-16 bg-pink-400/30 rounded-full rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-24 bg-blue-400/30 rounded-full -rotate-12"></div>
        <div className="absolute top-1/2 left-20 w-6 h-12 bg-orange-400/30 rounded-full rotate-90"></div>

        <div className="relative z-10 text-center">
          <Image
            src="/logo.png"
            alt="SAURO SOFTWARE"
            width={280}
            height={120}
            priority
            className="mx-auto"
          />
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-green-800 mb-6">
              <Image
                src="/logo.png"
                alt="SAURO SOFTWARE"
                width={280}
                height={120}
                priority
                className="mx-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Inicio de sesión
            </h1>
            <p className="text-gray-500 text-sm">
              ¡Ya casi estás en tu espacio de trabajo!
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <label className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600">Show</span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Login"}
            </Button>
          </form>
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
