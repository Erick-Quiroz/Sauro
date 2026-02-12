"use client";

import {
  useToast,
  ToastContainer,
  ConfirmDeleteDialog,
  useConfirmDialog,
} from "@/components";
import { CategoriasTable } from "@/modules/categorias/ui/CategoriasTable";
import { CategoriaFormModal } from "@/modules/categorias/ui/CategoriaFormModal";
import { useCategorias } from "@/modules/categorias/hooks/useCategorias";

export default function CategoriasPage() {
  const { toasts, showToast, removeToast } = useToast();
  const { dialogState, openDialog, closeDialog, handleConfirm } =
    useConfirmDialog();

  const {
    filteredCategorias,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingCategoria,
    isLoading,
    setSearchTerm,
    setCurrentPage,
    openModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useCategorias(showToast);

  const handleEditClick = (categoriaId: string | bigint) => {
    const categoria = filteredCategorias.find((c) => c.id === categoriaId);
    if (categoria) {
      openModal(categoria);
    }
  };

  const handleFormSubmit = (formData: any) => {
    if (editingCategoria?.id) {
      handleUpdate(editingCategoria.id, formData);
    } else {
      handleCreate(formData);
    }
  };

  const onDeleteClick = (id: string | bigint) => {
    const categoria = filteredCategorias.find((c) => c.id === id);
    if (!categoria) return;

    openDialog(
      "Eliminar Categoría",
      "Esta acción no se puede deshacer. La categoría será eliminada permanentemente.",
      () => handleDelete(id),
      categoria.nombre,
    );
  };

  return (
    <div className="space-y-6">
      <CategoriasTable
        filteredCategorias={filteredCategorias}
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
        onCreateClick={() => openModal()}
      />

      <CategoriaFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        editingCategoria={editingCategoria}
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
