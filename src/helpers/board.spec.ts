declare var jest, describe, it, expect;

import { ID2Number } from './square';

describe('Square converters', () => {
  it('should convert Square ID to number', () => {
    expect(ID2Number('A1')).toBe(11)
    expect(ID2Number('A8')).toBe(18)
    expect(ID2Number('H1')).toBe(81)
    expect(ID2Number('H8')).toBe(88)
  });
});