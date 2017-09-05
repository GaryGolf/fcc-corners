declare var jest, describe, it, expect;

import { ID2Number, Number2ID } from './square';

describe('Square converters', () => {
  
  it('should convert Square ID to number', () => {
    expect(ID2Number('A1')).toBe(11)
    expect(ID2Number('A8')).toBe(18)
    expect(ID2Number('H1')).toBe(81)
    expect(ID2Number('H8')).toBe(88)
  })

  it('should convert number to Square', () => {
    expect(Number2ID(11)).toBe('A1')
    expect(Number2ID(18)).toBe('A8')
    expect(Number2ID(81)).toBe('H1')
    expect(Number2ID(88)).toBe('H8')
  })
});