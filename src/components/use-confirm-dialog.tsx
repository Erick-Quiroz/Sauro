"use client";

import { useState } from "react";

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  description: string;
  itemName?: string;
  onConfirm: () => void;
}

export function useConfirmDialog() {
  const [dialogState, setDialogState] = useState<ConfirmDialogState>({
    isOpen: false,
    title: "",
    description: "",
    itemName: undefined,
    onConfirm: () => {},
  });

  const openDialog = (
    title: string,
    description: string,
    onConfirm: () => void,
    itemName?: string,
  ) => {
    setDialogState({
      isOpen: true,
      title,
      description,
      itemName,
      onConfirm,
    });
  };

  const closeDialog = () => {
    setDialogState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleConfirm = () => {
    dialogState.onConfirm();
    closeDialog();
  };

  return {
    dialogState,
    openDialog,
    closeDialog,
    handleConfirm,
  };
}
