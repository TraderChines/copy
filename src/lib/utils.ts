import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseTradeResult(result: string): number {
  if (typeof result !== 'string') return 0;
  const sanitized = result.replace("R$", "").replace(/\./g, "").replace(",", ".");
  const value = parseFloat(sanitized);
  return isNaN(value) ? 0 : value;
}

    