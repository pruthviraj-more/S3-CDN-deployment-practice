/**
 * Meridian Finance — Sovereign Formatter Utilities
 * High-craft typography and number presentation for UHNW & institutional terminals.
 */

/**
 * Formats a currency value with comma separators and no cents
 * e.g. 4821490000 => "$4,821,490,000"
 */
export function formatCurrency(amount: number, currency = '$'): string {
  if (isNaN(amount)) return `${currency}0`;
  return `${currency}${Math.round(amount).toLocaleString('en-US')}`;
}

/**
 * Formats compact sovereign figures
 * e.g. 4820000000 => "$4.82B", 15400000 => "$15.4M"
 */
export function formatCompactCurrency(amount: number, currency = '$'): string {
  if (isNaN(amount)) return `${currency}0`;
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000) {
    return `${currency}${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (abs >= 1_000_000) {
    return `${currency}${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (abs >= 1_000) {
    return `${currency}${(amount / 1_000).toFixed(1)}k`;
  }
  return `${currency}${amount.toLocaleString('en-US')}`;
}

/**
 * Formats percentages with explicit sign if requested
 * e.g. 4.25 => "+4.25%"
 */
export function formatPercent(value: number, includeSign = false, decimals = 2): string {
  if (isNaN(value)) return '0.00%';
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Formats basis points
 * e.g. 25 => "+25 bps"
 */
export function formatBps(value: number, includeSign = true): string {
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value} bps`;
}

/**
 * Formats integer with commas
 */
export function formatNumber(num: number): string {
  if (isNaN(num)) return '0';
  return Math.round(num).toLocaleString('en-US');
}

/**
 * Formats UTC ISO timestamp to editorial date string
 * e.g. "2026-10-16T12:00:00Z" => "October 16, 2026"
 */
export function formatEditorialDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Generates an institutional verification hash
 */
export function generateVerificationHash(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return `0x${Math.abs(hash).toString(16).padStart(8, '0').toUpperCase()}::MERIDIAN`;
}
