"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  itemName?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteDialog({
  isOpen,
  title,
  description,
  itemName,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-sauro-red-light p-2 rounded-lg">
              <AlertCircle className="text-sauro-red" size={24} />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {title}
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="mt-4 text-gray-600">
            {description}
            {itemName && (
              <p className="font-semibold text-gray-900 mt-2">"{itemName}"</p>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 justify-end mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="bg-sauro-red hover:bg-sauro-red/90 text-white font-semibold"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
