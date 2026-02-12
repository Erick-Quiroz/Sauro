"use client";

import { useRouter } from "next/navigation";
import {
  useToast,
  ToastContainer,
  ConfirmDeleteDialog,
  useConfirmDialog,
} from "@/components";
import { ArticulosTable } from "@/modules/articulos/ui/ArticulosTable";
import { useArticulos } from "@/modules/articulos/hooks/useArticulos";

export default function ArticulosPage() {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();
  const { dialogState, openDialog, closeDialog, handleConfirm } =
    useConfirmDialog();

  const {
    filteredArticulos,
    searchTerm,
    currentPage,
    totalPages,
    isLoading,
    setSearchTerm,
    setCurrentPage,
    handleDelete,
  } = useArticulos(showToast);

  const handleEditClick = (articulo: any) => {
    router.push(`/admin/articulos/editor?id=${articulo.id}`);
  };

  const onDeleteClick = (articulo: any) => {
    if (articulo.id === undefined) return;

    openDialog(
      "Eliminar Artículo",
      "Esta acción no se puede deshacer. El artículo será eliminado permanentemente.",
      () => handleDelete(articulo.id),
      articulo.titulo,
    );
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
        onDelete={onDeleteClick}
        onCreateClick={() => router.push("/admin/articulos/editor")}
      />

      <ConfirmDeleteDialog
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        description={dialogState.description}
        itemName={dialogState.itemName}
        isLoading={isLoading}
        onConfirm={handleConfirm}
        onCancel={closeDialog}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
