// 📊 DATOS DE PRUEBA PARA TESTING DE API

// ============================================
// ROLES
// ============================================
export const roleData = {
  create: {
    nombre: "Administrador",
    permisos: {
      usuarios: ["crear", "leer", "actualizar", "eliminar"],
      articulos: ["crear", "leer", "actualizar", "eliminar"],
      categorias: ["crear", "leer", "actualizar", "eliminar"],
      roles: ["crear", "leer", "actualizar", "eliminar"],
    },
  },
  createEditor: {
    nombre: "Editor",
    permisos: {
      usuarios: ["leer"],
      articulos: ["crear", "leer", "actualizar"],
      categorias: ["leer"],
      roles: [],
    },
  },
  createViewer: {
    nombre: "Viewer",
    permisos: {
      usuarios: [],
      articulos: ["leer"],
      categorias: ["leer"],
      roles: [],
    },
  },
  update: {
    nombre: "Moderador",
    permisos: {
      usuarios: ["leer", "actualizar"],
      articulos: ["leer", "actualizar"],
      categorias: ["leer"],
      roles: [],
    },
  },
};

// ============================================
// USUARIOS
// ============================================
export const usuarioData = {
  create: {
    id_rol: 1, // Debes reemplazar con un ID de rol existente
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@example.com",
    password: "Password123!",
  },
  createSecond: {
    id_rol: 1,
    nombre: "María",
    apellido: "García",
    email: "maria.garcia@example.com",
    password: "SecurePass456!",
  },
  createThird: {
    id_rol: 1,
    nombre: "Carlos",
    apellido: "López",
    email: "carlos.lopez@example.com",
    password: "SecurePass789!",
  },
  update: {
    nombre: "Juan Carlos",
    apellido: "Pérez García",
    email: "juancarlos.perez@example.com",
  },
};

// ============================================
// CATEGORIAS
// ============================================
export const categoriaData = {
  create: {
    nombre: "Tecnología",
    create_by: 1, // Debes reemplazar con un ID de usuario existente
  },
  createSecond: {
    nombre: "Negocios",
    create_by: 1,
  },
  createThird: {
    nombre: "Salud",
    create_by: 1,
  },
  update: {
    nombre: "Tecnología e Innovación",
    update_by: 1,
  },
};

// ============================================
// ARTICULOS
// ============================================
export const articuloData = {
  create: {
    id_categoria: 1, // Debes reemplazar con un ID de categoría existente
    titulo: "Introducción a Next.js",
    contenido: {
      texto: "Next.js es un framework de React para producción...",
      tags: ["nextjs", "react", "javascript"],
      autor: "Juan Pérez",
    },
    create_by: 1, // Debes reemplazar con un ID de usuario existente
  },
  createSecond: {
    id_categoria: 1,
    titulo: "Las 10 mejores prácticas de TypeScript",
    contenido: {
      texto:
        "TypeScript es un superset de JavaScript que añade tipos estáticos...",
      tags: ["typescript", "javascript", "buenas-practicas"],
      autor: "María García",
    },
    create_by: 2,
  },
  createThird: {
    id_categoria: 2,
    titulo: "Estrategias de Growth Hacking",
    contenido: {
      texto:
        "El growth hacking es una metodología enfocada en el crecimiento rápido...",
      tags: ["growth", "marketing", "estrategia"],
      autor: "Carlos López",
    },
    create_by: 3,
  },
  update: {
    titulo: "Introducción Completa a Next.js 14",
    contenido: {
      texto: "Next.js 14 es un framework de React con muchas mejoras...",
      tags: ["nextjs", "react", "javascript", "v14"],
      autor: "Juan Pérez Actualizado",
    },
    update_by: 1,
  },
};

// ============================================
// IMAGENES ARTICULOS
// ============================================
export const imgArticuloData = {
  create: {
    id_articulo: 1, // Debes reemplazar con un ID de artículo existente
    url: "https://example.com/images/nextjs-intro.jpg",
    orden: 1,
  },
  createSecond: {
    id_articulo: 1,
    url: "https://example.com/images/nextjs-diagram.jpg",
    orden: 2,
  },
  createThird: {
    id_articulo: 2,
    url: "https://example.com/images/typescript-logo.jpg",
    orden: 1,
  },
};

// ============================================
// RESUMEN DE DATOS RELACIONADOS
// ============================================
/*
FLUJO DE CREACIÓN RECOMENDADO:
1. Crear Rol → obtienes rol.id
2. Crear Usuario con id_rol → obtienes usuario.id
3. Crear Categoría con create_by (usuario.id) → obtienes categoria.id
4. Crear Artículo con id_categoria y create_by → obtienes articulo.id
5. Crear ImgArticulo con id_articulo → obtienes imagen.id

EJEMPLO DE IDS ESPERADOS:
- rol.id = 1
- usuario[0].id = 1, usuario[1].id = 2, usuario[2].id = 3
- categoria[0].id = 1, categoria[1].id = 2, categoria[2].id = 3
- articulo[0].id = 1, articulo[1].id = 2, articulo[2].id = 3
- imgArticulo[0].id = 1, imgArticulo[1].id = 2, imgArticulo[2].id = 3
*/

// ============================================
// LOGS
// ============================================
export const logData = {
  create: {
    id_usuario: 1, // Debes reemplazar con un ID de usuario existente
    accion: "CREATE",
    tabla: "articulos",
    id_registro: 1,
    descripcion: "Artículo creado exitosamente",
    ip: "192.168.1.100",
    user_agent: "Mozilla/5.0...",
  },
  createSecond: {
    id_usuario: 2,
    accion: "UPDATE",
    tabla: "usuarios",
    id_registro: 1,
    descripcion: "Usuario actualizado",
    ip: "192.168.1.101",
    user_agent: "Mozilla/5.0...",
  },
};

console.log("📊 Datos de prueba cargados correctamente");
