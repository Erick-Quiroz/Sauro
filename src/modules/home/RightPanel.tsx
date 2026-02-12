"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface RightPanelProps {
  showImage?: boolean;
  showSearch?: boolean;
  showContact?: boolean;
}

interface SearchResult {
  id: string;
  type: "articulo" | "categoria";
  titulo: string;
  categoria?: string;
}

export function RightPanel({
  showImage = true,
  showSearch = true,
  showContact = true,
}: RightPanelProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchArticulos = async () => {
      if (searchTerm.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      setShowResults(true);

      try {
        const response = await fetch(`/api/v1/articulos?page=1&limit=100`);
        const json = await response.json();

        if (json.success) {
          const articulos = json.data.items || [];
          const filtered = articulos
            .filter(
              (art: any) =>
                art.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                art.categoria?.nombre
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()),
            )
            .slice(0, 5)
            .map((art: any) => ({
              id: art.id.toString(),
              type: "articulo" as const,
              titulo: art.titulo,
              categoria: art.categoria?.nombre,
            }));

          setSearchResults(filtered);
        }
      } catch (error) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchArticulos, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSelectResult = (result: SearchResult) => {
    setSearchTerm("");
    setShowResults(false);
    router.push(`/articulo/${result.id}`);
  };

  return (
    <div className="space-y-6 h-full flex flex-col lg:flex-col">
      {showImage && (
        <div className="backdrop-blur-sm bg-white/70 rounded-2xl shadow-xl p-6 border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent z-10"></div>
            <Image
              src="/faq.png"
              alt="Ayuda"
              width={600}
              height={250}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      )}

      {showSearch && (
        <div className="order-1 backdrop-blur-sm bg-white/70 rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 relative z-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              Búsqueda Rápida
            </h3>
          </div>
          <p className="mb-5 text-slate-600">
            Encuentra lo que necesitas al instante
          </p>

          <div className="relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
              className="w-full px-5 py-3 pl-12 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder-slate-400"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {showResults && (
              <div className="absolute z-[100] w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"></div>
                    <p className="text-sm">Buscando...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSelectResult(result)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                              {result.titulo}
                            </p>
                            {result.categoria && (
                              <p className="text-sm text-gray-500 mt-1">
                                <span className="inline-flex items-center gap-1">
                                  <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                  </svg>
                                  {result.categoria}
                                </span>
                              </p>
                            )}
                          </div>
                          <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <svg
                      className="w-12 h-12 mx-auto mb-2 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01"
                      />
                    </svg>
                    <p className="text-sm">No se encontraron resultados</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Intenta con otros términos
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {showContact && (
        <div className="order-3 lg:order-2 backdrop-blur-sm bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h4 className="font-bold text-xl text-white">
                ¿Necesitas más ayuda?
              </h4>
            </div>
            <p className="text-sm mb-5 text-white/90">
              Contacta con nuestro equipo de soporte
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 hover:scale-110 transition-all duration-200 text-white shadow-lg"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 hover:scale-110 transition-all duration-200 text-white shadow-lg"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="mailto:soporte@email.com"
                className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 hover:scale-110 transition-all duration-200 text-white shadow-lg"
              >
                <MdEmail size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
