import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

/**
 * Combines multiple CSS class names into a single string.
 *
 * @param inputs - An array of class name values to be merged.
 * @returns A single string containing the merged class names.
 */
export function cn(...inputs: ClassNameValue[]) {
  return twMerge(clsx(inputs));
}
