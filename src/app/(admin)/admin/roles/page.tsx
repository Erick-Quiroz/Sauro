"use client";

import { useToast, ToastContainer } from "@/components";
import { RolesTable } from "@/modules/roles/ui/RolesTable";
import { RolFormModal } from "@/modules/roles/ui/RolFormModal";
import { useRoles } from "@/modules/roles/hooks/useRoles";
import { Rol, CreateRolDTO } from "@/modules/roles/rol.types";

export default function RolesPage() {
  const { toasts, showToast, removeToast } = useToast();

  const {
    filteredRoles,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingRol,
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
        onDelete={(rol) => rol.id !== undefined && handleDelete(rol.id)}
        onCreateClick={() => openModal()}
      />

      <RolFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        editingRol={editingRol}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
