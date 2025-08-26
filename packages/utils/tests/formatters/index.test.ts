import { describe, it, expect } from 'bun:test'
import {
  formatDate,
  formatCurrency
} from '../../src/formatters/index'

describe('Formatters Utils', () => {
  describe('formatDate', () => {
    it('should return empty string (placeholder)', () => {
      const result = formatDate()
      
      expect(result).toBe('')
    })
  })

  describe('formatCurrency', () => {
    it('should return empty string (placeholder)', () => {
      const result = formatCurrency()
      
      expect(result).toBe('')
    })
  })
})
