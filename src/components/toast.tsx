"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, X, Info } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type, duration = 4000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success:
      "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50",
    error:
      "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/50",
    info: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/50",
  };

  const icons = {
    success: <CheckCircle size={22} className="flex-shrink-0" />,
    error: <AlertCircle size={22} className="flex-shrink-0" />,
    info: <Info size={22} className="flex-shrink-0" />,
  };

  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 ${styles[type]} ${
        isExiting
          ? "animate-out fade-out slide-out-to-right-full"
          : "animate-in fade-in slide-in-from-right-full"
      }`}
    >
      <div className="flex items-center justify-center w-6 h-6">
        {icons[type]}
      </div>
      <span className="font-semibold text-sm flex-1">{message}</span>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            onClose?.();
          }, 300);
        }}
        className="ml-2 hover:bg-white/20 p-1.5 rounded-lg transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: {
    id: string;
    message: string;
    type: "success" | "error" | "info";
  }[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-6 right-6 z-[9999] space-y-3 max-w-md">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            transform: `translateY(${index * 8}px)`,
            zIndex: 9999 - index,
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<
    {
      id: string;
      message: string;
      type: "success" | "error" | "info";
    }[]
  >([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    const id = Date.now().toString() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    toasts,
    showToast,
    removeToast,
  };
}
