import { ClientLayout } from "@/components/layout/client";
import { TopBanner, LeftPanel, RightPanel } from "@/modules/home";
import { categoriaService } from "@/modules/categorias/categoria.service";

export default async function Home() {
  const categorias = await categoriaService.getAllCategoriasWithArticulos();

  return (
    <ClientLayout>
      <TopBanner />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <LeftPanel categorias={categorias} />
        </div>
        <div className="w-full md:w-1/2">
          <RightPanel />
        </div>
      </div>
    </ClientLayout>
  );
}
