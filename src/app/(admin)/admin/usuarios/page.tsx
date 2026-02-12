"use client";

import { useToast, ToastContainer, ConfirmDeleteDialog } from "@/components";
import { useConfirmDialog } from "@/components/use-confirm-dialog";
import { UsuariosTable } from "@/modules/usuarios/ui/UsuariosTable";
import { UsuarioFormModal } from "@/modules/usuarios/ui/UsuarioFormModal";
import { useUsuarios } from "@/modules/usuarios/hooks/useUsuarios";
import { Usuario, CreateUsuarioDTO } from "@/modules/usuarios/usuario.types";

export default function UsuariosPage() {
  const { toasts, showToast, removeToast } = useToast();
  const { dialogState, openDialog, closeDialog, handleConfirm } =
    useConfirmDialog();

  const {
    filteredUsuarios,
    searchTerm,
    currentPage,
    totalPages,
    isModalOpen,
    editingUsuario,
    isLoading,
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

  const onDeleteClick = (usuario: Usuario) => {
    if (!usuario.id) return;

    openDialog(
      "Eliminar Usuario",
      "Esta acción no se puede deshacer. El usuario será eliminado permanentemente.",
      () => handleDelete(usuario.id!),
      `${usuario.nombre} ${usuario.apellido}`,
    );
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
        onDelete={onDeleteClick}
        onCreateClick={() => openModal()}
      />

      <UsuarioFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        editingUsuario={editingUsuario}
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
