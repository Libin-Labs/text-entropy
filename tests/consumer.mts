import * as api from '@lp-labs/text-entropy';
import { shannonEntropy } from '@lp-labs/text-entropy';
const bits = shannonEntropy('abab').bitsPerSymbol;
if (Math.abs(bits - 1) > 1e-12) throw new Error('Expected one bit per symbol');
// @ts-expect-error invalid argument must be rejected by declarations
shannonEntropy('x', 10);
