import { prisma } from "@/lib/prisma";

async function main() {
  const rolAdmin = await prisma.rol.upsert({
    where: { id: BigInt(1) },
    update: {},
    create: {
      nombre: "Administrador",
      permisos: {
        usuarios: true,
        roles: true,
        categorias: true,
        articulos: true,
      },
    },
  });

  const usuarioAdmin = await prisma.usuarios.upsert({
    where: { email: "admin@sauro.com" },
    update: {},
    create: {
      id_rol: rolAdmin.id,
      nombre: "Admin",
      apellido: "SAURO",
      email: "admin@sauro.com",
      password: "admin123",
    },
  });

  const usuario = await prisma.usuarios.upsert({
    where: { email: "juan@sauro.com" },
    update: {},
    create: {
      id_rol: rolAdmin.id,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@sauro.com",
      password: "password123",
    },
  });

  const categoria = await prisma.categorias.upsert({
    where: { id: BigInt(1) },
    update: {},
    create: {
      nombre: "Tecnología",
      create_by: usuarioAdmin.id,
    },
  });

  const articulo = await prisma.articulos.upsert({
    where: { id: BigInt(1) },
    update: {},
    create: {
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
      create_by: usuarioAdmin.id,
    },
  });
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
