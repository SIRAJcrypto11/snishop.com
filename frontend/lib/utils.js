import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind conflict resolution
 * @param {...string} inputs - Class names
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
