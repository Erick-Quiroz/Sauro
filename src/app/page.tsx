import { ClientLayout } from "@/components/layout/client";
import { TopBanner, LeftPanel, RightPanel } from "@/modules/home";
import { categoriaService } from "@/modules/categorias/categoria.service";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;
  const categorias =
    await categoriaService.getAllCategoriasWithArticulos(isAuthenticated);

  return (
    <ClientLayout user={user}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <TopBanner />
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-8">
              <div className="w-full lg:hidden relative z-50">
                <RightPanel showSearch showContact={false} showImage={false} />
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/5">
                  <LeftPanel
                    categorias={categorias}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
                <div className="hidden lg:block w-full lg:w-2/5 relative z-50">
                  <RightPanel showSearch showContact showImage />
                </div>
              </div>

              <div className="w-full lg:hidden">
                <RightPanel showSearch={false} showContact showImage={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
