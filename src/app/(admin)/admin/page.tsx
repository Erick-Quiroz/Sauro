import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Package, FolderOpen, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Usuarios",
      value: "48",
      icon: Users,
      href: "/admin/usuarios",
      color: "sauro-green",
    },
    {
      title: "Artículos",
      value: "156",
      icon: Package,
      href: "/admin/articulos",
      color: "sauro-green",
    },
    {
      title: "Categorías",
      value: "12",
      icon: FolderOpen,
      href: "/admin/categorias",
      color: "sauro-green",
    },
    {
      title: "Roles",
      value: "5",
      icon: Shield,
      href: "/admin/roles",
      color: "sauro-green",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Bienvenido al panel de administración de SAURO SOFTWARE
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.href} href={stat.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="bg-sauro-green-light p-3 rounded-lg">
                    <Icon className="text-sauro-green" size={24} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/admin/usuarios?action=create">
            <Button
              variant="outline"
              className="w-full hover:bg-sauro-green hover:text-black hover:border-sauro-green"
            >
              <Users size={18} className="mr-2" />
              Nuevo Usuario
            </Button>
          </Link>
          <Link href="/admin/articulos?action=create">
            <Button
              variant="outline"
              className="w-full hover:bg-sauro-green hover:text-black hover:border-sauro-green"
            >
              <Package size={18} className="mr-2" />
              Nuevo Artículo
            </Button>
          </Link>
          <Link href="/admin/categorias?action=create">
            <Button
              variant="outline"
              className="w-full hover:bg-sauro-green hover:text-black hover:border-sauro-green"
            >
              <FolderOpen size={18} className="mr-2" />
              Nueva Categoría
            </Button>
          </Link>
          <Link href="/admin/roles?action=create">
            <Button
              variant="outline"
              className="w-full hover:bg-sauro-green hover:text-black hover:border-sauro-green"
            >
              <Shield size={18} className="mr-2" />
              Nuevo Rol
            </Button>
          </Link>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Actividad Reciente
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-sauro-green-light rounded-lg">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-sauro-green" size={20} />
              <span className="text-gray-700">Se creó un nuevo usuario</span>
            </div>
            <span className="text-xs text-gray-500">Hace 2h</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-blue-600" size={20} />
              <span className="text-gray-700">Se actualizó una categoría</span>
            </div>
            <span className="text-xs text-gray-500">Hace 4h</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
