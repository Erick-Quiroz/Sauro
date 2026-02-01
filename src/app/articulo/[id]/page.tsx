import { ClientLayout } from "@/components/layout/client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface ArticuloPageProps {
  params: {
    id: string;
  };
}

export default async function ArticuloPage({ params }: ArticuloPageProps) {
  const articulo = await prisma.articulos.findUnique({
    where: { id: BigInt(params.id) },
    include: {
      categoria: {
        select: {
          nombre: true,
        },
      },
    },
  });

  if (!articulo) {
    notFound();
  }

  const renderContent = (content: any) => {
    if (!content) return null;

    if (Array.isArray(content)) {
      return content.map((block: any, index: number) => {
        if (block.type === "paragraph") {
          const text = block.content
            ?.map((item: any) => item.text || "")
            .join("");
          return (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {text}
            </p>
          );
        }
        if (block.type === "heading") {
          const text = block.content
            ?.map((item: any) => item.text || "")
            .join("");
          const level = block.attrs?.level || 1;
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag
              key={index}
              className={`font-bold mb-3 ${
                level === 1 ? "text-3xl" : level === 2 ? "text-2xl" : "text-xl"
              }`}
            >
              {text}
            </HeadingTag>
          );
        }
        return null;
      });
    }

    return <div className="prose max-w-none">{JSON.stringify(content)}</div>;
  };

  return (
    <ClientLayout>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Volver
        </Link>

        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
            {articulo.categoria.nombre}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {articulo.titulo}
          </h1>
          <div className="text-sm text-gray-500">
            Publicado el {new Date(articulo.create_at).toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            {renderContent(articulo.contenido)}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold mb-3">¿Necesitas más ayuda?</h4>
            <p className="text-blue-100">
              Contacta con nuestro equipo de soporte a través de estos canales
            </p>
          </div>
          <div className="flex justify-center gap-6">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover:scale-105"
            >
              <FaWhatsapp size={32} />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover:scale-105"
            >
              <FaFacebook size={32} />
              <span className="text-sm font-medium">Facebook</span>
            </a>
            <a
              href="mailto:soporte@email.com"
              className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all hover:scale-105"
            >
              <MdEmail size={32} />
              <span className="text-sm font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
