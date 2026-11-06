export interface Entropy {
  readonly symbols: number;
  readonly distinct: number;
  readonly bitsPerSymbol: number;
  readonly totalBits: number;
}
export function shannonEntropy(text: string, base: 2 | 'e' = 2): Entropy {
  if (typeof text !== 'string' || text.length > 1000000)
    throw new TypeError('Expected bounded text');
  if (base !== 2 && base !== 'e') throw new RangeError('Base must be 2 or e');
  const points = [...text],
    counts = new Map<string, number>();
  for (const p of points) counts.set(p, (counts.get(p) ?? 0) + 1);
  const n = points.length;
  if (!n) return { symbols: 0, distinct: 0, bitsPerSymbol: 0, totalBits: 0 };
  const divisor = Math.log(base === 'e' ? Math.E : 2);
  let entropy = 0;
  for (const count of counts.values()) {
    const p = count / n;
    entropy -= (p * Math.log(p)) / divisor;
  }
  return { symbols: n, distinct: counts.size, bitsPerSymbol: entropy, totalBits: entropy * n };
}
