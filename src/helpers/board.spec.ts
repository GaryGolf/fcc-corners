declare var jest, describe, it, expect;

import { ID2Number, Number2ID } from './square';
import { getPositionPoint } from './board'

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
})

describe('Position ponis', () => {
  
  it('should calc position point', () => {
    expect(getPositionPoint('A1')).toBe(1)
    expect(getPositionPoint('H1')).toBe(8)
    expect(getPositionPoint('B6')).toBe(2)
    expect(getPositionPoint('F7')).toBe(2)
    expect(getPositionPoint('E4')).toBe(5)
    expect(getPositionPoint('F4')).toBe(6)
    expect(getPositionPoint('G4')).toBe(6)
    expect(getPositionPoint('H4')).toBe(6)
  })
})