
import { useToast as useToastOriginal, toast as toastOriginal, type ToastProps } from "@/components/ui/use-toast";

/**
 * Hook for accessing toast functionality
 */
export const useToast = useToastOriginal;

/**
 * Function for showing toasts without hooks
 */
export const toast = toastOriginal;

// Re-export types for consistency
export type { ToastProps };
