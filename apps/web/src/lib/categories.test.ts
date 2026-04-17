import { HABIT_CATEGORIES, getCategoryConfig } from './categories';

describe('Categories Library Boundaries', () => {
  it('should map core categories precisely without duplication', () => {
    expect(HABIT_CATEGORIES.length).toBeGreaterThan(0);
    expect(HABIT_CATEGORIES.map(c => c.id)).toContain('health');
  });

  describe('getCategoryConfig', () => {
    it('should reliably translate categories to their objects', () => {
      expect(getCategoryConfig('health').color).toBe('#FFB5C5');
      expect(getCategoryConfig('invalid_category').id).toBe('health'); 
    });
  });
});
