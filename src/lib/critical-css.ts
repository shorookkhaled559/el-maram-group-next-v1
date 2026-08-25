/**
 * Critical CSS generator
 * Reads and minifies critical CSS for inline injection
 */

import fs from 'fs';
import path from 'path';

let cachedCriticalCSS: string | null = null;

export function getCriticalCSS(): string {
  // Cache in production for performance
  if (process.env.NODE_ENV === 'production' && cachedCriticalCSS) {
    return cachedCriticalCSS;
  }

  try {
    const criticalPath = path.join(process.cwd(), 'src', 'app', 'critical.css');
    let css = fs.readFileSync(criticalPath, 'utf-8');
    
    // Basic minification: remove comments, extra whitespace, and newlines
    css = css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ')              // Collapse whitespace
      .replace(/\s*([{}:;,])\s*/g, '$1') // Remove space around punctuation
      .replace(/;}/g, '}')               // Remove last semicolon in blocks
      .trim();
    
    cachedCriticalCSS = css;
    return css;
  } catch (error) {
    console.error('Failed to read critical CSS:', error);
    return '';
  }
}
