
import { useToast as useToastOriginal, toast as toastOriginal } from "@/components/ui/use-toast";

/**
 * Hook for accessing toast functionality
 */
export const useToast = useToastOriginal;

/**
 * Function for showing toasts without hooks
 */
export const toast = toastOriginal;
