"use client";

import {
  useToast,
  ToastContainer,
  ConfirmDeleteDialog,
  useConfirmDialog,
} from "@/components";
import { RolesTable } from "@/modules/roles/ui/RolesTable";
import { RolFormModal } from "@/modules/roles/ui/RolFormModal";
import { useRoles } from "@/modules/roles/hooks/useRoles";
import { Rol, CreateRolDTO } from "@/modules/roles/rol.types";

export default function RolesPage() {
  const { toasts, showToast, removeToast } = useToast();
  const { dialogState, openDialog, closeDialog, handleConfirm } =
    useConfirmDialog();

  const {
    filteredRoles,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingRol,
    isLoading,
    setSearchTerm,
    setCurrentPage,
    openModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useRoles(showToast);

  const handleFormSubmit = (formData: CreateRolDTO) => {
    if (editingRol && editingRol.id !== undefined) {
      handleUpdate(editingRol.id, formData);
    } else {
      handleCreate(formData);
    }
  };

  const onDeleteClick = (rol: Rol) => {
    if (rol.id === undefined) return;

    openDialog(
      "Eliminar Rol",
      "Esta acción no se puede deshacer. El rol será eliminado permanentemente.",
      () => handleDelete(rol.id!),
      rol.nombre,
    );
  };

  return (
    <div className="space-y-6">
      <RolesTable
        roles={filteredRoles}
        searchTerm={searchTerm}
        currentPage={currentPage}
        totalPages={totalPages}
        onSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
        onEdit={openModal}
        onDelete={onDeleteClick}
        onCreateClick={() => openModal()}
      />

      <RolFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        editingRol={editingRol}
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
