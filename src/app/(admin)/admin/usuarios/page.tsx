"use client";

import { useToast, ToastContainer } from "@/components";
import { UsuariosTable } from "@/modules/usuarios/ui/UsuariosTable";
import { UsuarioFormModal } from "@/modules/usuarios/ui/UsuarioFormModal";
import { useUsuarios } from "@/modules/usuarios/hooks/useUsuarios";
import { Usuario, CreateUsuarioDTO } from "@/modules/usuarios/usuario.types";

export default function UsuariosPage() {
  const { toasts, showToast, removeToast } = useToast();

  const {
    filteredUsuarios,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingUsuario,
    setSearchTerm,
    setCurrentPage,
    openModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useUsuarios(showToast);

  const handleFormSubmit = (formData: CreateUsuarioDTO) => {
    if (editingUsuario && editingUsuario.id) {
      handleUpdate(editingUsuario.id, formData);
    } else {
      handleCreate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <UsuariosTable
        usuarios={filteredUsuarios}
        searchTerm={searchTerm}
        currentPage={currentPage}
        totalPages={totalPages}
        onSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
        onEdit={openModal}
        onDelete={(usuario) => usuario.id && handleDelete(usuario.id)}
        onCreateClick={() => openModal()}
      />

      <UsuarioFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        editingUsuario={editingUsuario}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
