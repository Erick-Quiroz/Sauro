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

  const renderTextContent = (content: any[]) => {
    if (!content || !Array.isArray(content)) return null;

    return content.map((item: any, idx: number) => {
      const text = item.text || "";
      let element = <span key={idx}>{text}</span>;

      if (item.styles) {
        let className = "";
        if (item.styles.bold) className += "font-bold ";
        if (item.styles.italic) className += "italic ";
        if (item.styles.underline) className += "underline ";
        if (item.styles.strikethrough) className += "line-through ";
        if (item.styles.code)
          className += "bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono ";

        element = (
          <span key={idx} className={className.trim()}>
            {text}
          </span>
        );
      }

      return element;
    });
  };

  const renderContent = (content: any) => {
    if (!content) return null;

    if (Array.isArray(content)) {
      return content.map((block: any, index: number) => {
        const blockId = block.id || index;

        if (block.type === "paragraph") {
          return (
            <p
              key={blockId}
              className="mb-4 text-gray-700 leading-relaxed text-base"
            >
              {renderTextContent(block.content)}
            </p>
          );
        }

        if (block.type === "heading") {
          const level = block.props?.level || 1;
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          const sizeClasses = {
            1: "text-4xl font-extrabold mb-6 mt-8 text-gray-900",
            2: "text-3xl font-bold mb-5 mt-7 text-gray-900",
            3: "text-2xl font-bold mb-4 mt-6 text-gray-800",
          };

          return (
            <HeadingTag
              key={blockId}
              className={
                sizeClasses[level as keyof typeof sizeClasses] ||
                "text-xl font-bold mb-3 mt-5"
              }
            >
              {renderTextContent(block.content)}
            </HeadingTag>
          );
        }

        if (block.type === "bulletListItem") {
          return (
            <li key={blockId} className="ml-6 mb-2 text-gray-700 list-disc">
              {renderTextContent(block.content)}
            </li>
          );
        }

        if (block.type === "numberedListItem") {
          return (
            <li key={blockId} className="ml-6 mb-2 text-gray-700 list-decimal">
              {renderTextContent(block.content)}
            </li>
          );
        }

        if (block.type === "checkListItem") {
          const checked = block.props?.checked || false;
          return (
            <div key={blockId} className="flex items-start gap-2 mb-2">
              <input
                type="checkbox"
                checked={checked}
                disabled
                className="mt-1 w-4 h-4"
              />
              <span
                className={`text-gray-700 ${checked ? "line-through text-gray-500" : ""}`}
              >
                {renderTextContent(block.content)}
              </span>
            </div>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={blockId}
              className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-600 bg-gray-50"
            >
              {renderTextContent(block.content)}
            </blockquote>
          );
        }

        if (block.type === "code") {
          const code =
            block.content?.map((item: any) => item.text || "").join("") || "";
          return (
            <pre
              key={blockId}
              className="bg-gray-900 text-white p-4 rounded-lg my-4 overflow-x-auto"
            >
              <code className="text-sm font-mono">{code}</code>
            </pre>
          );
        }

        if (block.type === "image") {
          const url = block.props?.url || "";
          const caption = block.props?.caption || "";
          return (
            <figure key={blockId} className="my-6">
              <img
                src={url}
                alt={caption}
                className="w-full rounded-lg shadow-md"
              />
              {caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "divider") {
          return <hr key={blockId} className="my-8 border-gray-300" />;
        }

        if (block.type === "table") {
          return (
            <div key={blockId} className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  {block.content?.rows?.map((row: any, rowIdx: number) => (
                    <tr key={rowIdx} className="border-b border-gray-300">
                      {row.cells?.map((cell: any, cellIdx: number) => (
                        <td
                          key={cellIdx}
                          className="border border-gray-300 px-4 py-2 text-gray-700"
                        >
                          {cell.content}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      });
    }

    return <div className="text-gray-500 italic">Contenido no disponible</div>;
  };

  return (
    <ClientLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors font-medium"
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

        <article className="mb-8">
          <header className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              {articulo.categoria.nombre}
            </span>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {articulo.titulo}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Publicado el{" "}
              {new Date(articulo.create_at).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </header>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-100">
            <div
              className="prose prose-lg max-w-none 
              prose-headings:text-gray-900  
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-white
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-gray-700 prose-li:marker:text-blue-600
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:italic
              prose-img:rounded-lg prose-img:shadow-md
            "
            >
              {renderContent(
                typeof articulo.contenido === "string"
                  ? JSON.parse(articulo.contenido)
                  : articulo.contenido,
              )}
            </div>
          </div>
        </article>

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
