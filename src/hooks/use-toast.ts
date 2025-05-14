
import { useToast as useToastOriginal, toast as toastOriginal } from "@/components/ui/use-toast";
import type { ToastProps as OriginalToastProps, ToastActionElement } from "@/components/ui/toast";

/**
 * Re-export the type explicitly to avoid import conflicts
 */
export type ToastProps = OriginalToastProps;

/**
 * Hook for accessing toast functionality
 */
export const useToast = useToastOriginal;

/**
 * Function for showing toasts without hooks
 */
export const toast = toastOriginal;

// Re-export additional types for consistency
export type { ToastActionElement };
