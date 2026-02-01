"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export interface BlockNoteEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

export function BlockNoteEditor({
  value = "",
  onChange,
  placeholder = "Escribe tu contenido aquí...",
}: BlockNoteEditorProps) {
  const editor = useCreateBlockNote({
    initialContent: value
      ? JSON.parse(value)
      : [
          {
            type: "paragraph",
            content: placeholder,
          },
        ],
  });

  const handleChange = () => {
    if (editor && onChange) {
      const serialized = JSON.stringify(editor.document);
      onChange(serialized);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-300">
      <BlockNoteView
        editor={editor}
        onChange={handleChange}
        className="min-h-96"
      />
    </div>
  );
}
