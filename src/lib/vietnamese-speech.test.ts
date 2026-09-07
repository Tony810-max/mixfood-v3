import { describe, expect, it } from 'vitest';
import { vietnameseTableNumber } from './vietnamese-speech';

describe('vietnameseTableNumber', () => {
  it('reads every digit in a table identifier using Vietnamese words', () => {
    expect(vietnameseTableNumber('01')).toBe('không một');
    expect(vietnameseTableNumber('B-205')).toBe('B hai không năm');
  });
});
