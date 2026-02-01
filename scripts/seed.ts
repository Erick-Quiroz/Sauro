import { prisma } from "@/lib/prisma";

async function main() {
  console.log("🌱 Creando datos de prueba...");

  // Crear Rol
  const rol = await prisma.rol.create({
    data: {
      nombre: "Administrador",
      permisos: {
        usuarios: true,
        roles: true,
        categorias: true,
        articulos: true,
      },
    },
  });
  console.log("✅ Rol creado:", rol);

  // Crear Usuario
  const usuario = await prisma.usuarios.create({
    data: {
      id_rol: rol.id,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@example.com",
      password: "password123",
    },
  });
  console.log("✅ Usuario creado:", usuario);

  // Crear Categoría
  const categoria = await prisma.categorias.create({
    data: {
      nombre: "Tecnología",
      create_by: usuario.id,
    },
  });
  console.log("✅ Categoría creada:", categoria);

  // Crear Artículo
  const articulo = await prisma.articulos.create({
    data: {
      id_categoria: categoria.id,
      titulo: "Introducción a TypeScript",
      contenido: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "TypeScript es un superset de JavaScript que añade tipado estático.",
              },
            ],
          },
        ],
      },
      create_by: usuario.id,
    },
  });
  console.log("✅ Artículo creado:", articulo);

  console.log("✨ Datos de prueba creados exitosamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
