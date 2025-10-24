import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseTradeResult(result: string): number {
  return parseFloat(result.replace(/[^\d,-]/g, "").replace(",", "."));
}
