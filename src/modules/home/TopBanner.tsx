"use client";

export function TopBanner() {
  return (
    <div className="w-full py-16 px-4 mb-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-10"></div>

      <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute top-0 right-1/4 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
          <span className="text-white text-sm font-semibold tracking-wide">
            Centro de Ayuda
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
          Preguntas Frecuentes
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-light">
          Encuentra respuestas rápidas a tus preguntas más comunes
        </p>

        <div className="mt-8 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
