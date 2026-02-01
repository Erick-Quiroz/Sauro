"use client";

import { useToast, ToastContainer } from "@/components";
import { CategoriasTable } from "@/modules/categorias/ui/CategoriasTable";
import { CategoriaFormModal } from "@/modules/categorias/ui/CategoriaFormModal";
import { useCategorias } from "@/modules/categorias/hooks/useCategorias";

export default function CategoriasPage() {
  const { toasts, showToast, removeToast } = useToast();

  const {
    filteredCategorias,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingCategoria,
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
        onDelete={handleDelete}
        onCreateClick={() => openModal()}
      />

      <CategoriaFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        editingCategoria={editingCategoria}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
