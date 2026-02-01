"use client";

import { useRouter } from "next/navigation";
import { useToast, ToastContainer } from "@/components";
import { ArticulosTable } from "@/modules/articulos/ui/ArticulosTable";
import { useArticulos } from "@/modules/articulos/hooks/useArticulos";

export default function ArticulosPage() {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const {
    filteredArticulos,
    searchTerm,
    currentPage,
    totalPages,
    setSearchTerm,
    setCurrentPage,
    handleDelete,
  } = useArticulos(showToast);

  const handleEditClick = (articulo: any) => {
    router.push(`/admin/articulos/editor?id=${articulo.id}`);
  };

  return (
    <div className="page-wrapper">
      <ArticulosTable
        articulos={filteredArticulos}
        searchTerm={searchTerm}
        currentPage={currentPage}
        totalPages={totalPages}
        onSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
        onEdit={handleEditClick}
        onDelete={(articulo) => articulo.id !== undefined && handleDelete(articulo.id)}
        onCreateClick={() => router.push("/admin/articulos/editor")}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
