import { InventoryItem, validateInventoryItem } from '../../src/models/inventory';

describe('Inventory Models', () => {
  describe('InventoryItem Interface', () => {
    it('should define the correct interface structure', () => {
      const item: InventoryItem = {
        id: '1',
        type: 'vehicle',
        status: 'available',
        quantity: 5
      };

      expect(item.id).toBe('1');
      expect(item.type).toBe('vehicle');
      expect(item.status).toBe('available');
      expect(item.quantity).toBe(5);
    });

    it('should handle different status values', () => {
      const statuses: Array<'available' | 'rented' | 'maintenance'> = ['available', 'rented', 'maintenance'];
      
      statuses.forEach((status, index) => {
        const item: InventoryItem = {
          id: `item-${index}`,
          type: 'equipment',
          status: status,
          quantity: index + 1
        };

        expect(item.status).toBe(status);
      });
    });

    it('should handle different item types', () => {
      const types = ['vehicle', 'equipment', 'accessory', 'insurance', 'fuel'];
      
      types.forEach((type, index) => {
        const item: InventoryItem = {
          id: `item-${index}`,
          type: type,
          status: 'available',
          quantity: 1
        };

        expect(item.type).toBe(type);
      });
    });

    it('should handle different quantity values', () => {
      const quantities = [0, 1, 10, 100, 1000];
      
      quantities.forEach((quantity, index) => {
        const item: InventoryItem = {
          id: `item-${index}`,
          type: 'vehicle',
          status: 'available',
          quantity: quantity
        };

        expect(item.quantity).toBe(quantity);
      });
    });
  });

  describe('validateInventoryItem Function', () => {
    describe('Valid Items', () => {
      it('should validate correct inventory items', () => {
        const validItems: InventoryItem[] = [
          {
            id: 'item-1',
            type: 'vehicle',
            status: 'available',
            quantity: 5
          },
          {
            id: 'item-2',
            type: 'equipment',
            status: 'rented',
            quantity: 0
          },
          {
            id: 'item-3',
            type: 'accessory',
            status: 'maintenance',
            quantity: 100
          },
          {
            id: 'very-long-id-12345678901234567890',
            type: 'special-equipment-type',
            status: 'available',
            quantity: 1
          }
        ];

        validItems.forEach(item => {
          expect(validateInventoryItem(item)).toBe(true);
        });
      });

      it('should validate items with zero quantity', () => {
        const item: InventoryItem = {
          id: 'item-zero',
          type: 'vehicle',
          status: 'available',
          quantity: 0
        };

        expect(validateInventoryItem(item)).toBe(true);
      });

      it('should validate items with different status types', () => {
        const statuses: Array<'available' | 'rented' | 'maintenance'> = ['available', 'rented', 'maintenance'];
        
        statuses.forEach(status => {
          const item: InventoryItem = {
            id: 'test-item',
            type: 'test-type',
            status: status,
            quantity: 1
          };

          expect(validateInventoryItem(item)).toBe(true);
        });
      });
    });

    describe('Invalid Items', () => {
      it('should reject items with empty or missing id', () => {
        const invalidItems = [
          {
            id: '',
            type: 'vehicle',
            status: 'available' as const,
            quantity: 1
          },
          {
            id: null as any,
            type: 'vehicle',
            status: 'available' as const,
            quantity: 1
          },
          {
            id: undefined as any,
            type: 'vehicle',
            status: 'available' as const,
            quantity: 1
          }
        ];

        invalidItems.forEach(item => {
          expect(validateInventoryItem(item)).toBe(false);
        });
      });

      it('should reject items with empty or missing type', () => {
        const invalidItems = [
          {
            id: 'item-1',
            type: '',
            status: 'available' as const,
            quantity: 1
          },
          {
            id: 'item-2',
            type: null as any,
            status: 'available' as const,
            quantity: 1
          },
          {
            id: 'item-3',
            type: undefined as any,
            status: 'available' as const,
            quantity: 1
          }
        ];

        invalidItems.forEach(item => {
          expect(validateInventoryItem(item)).toBe(false);
        });
      });

      it('should reject items with negative quantity', () => {
        const negativeQuantities = [-1, -10, -100, -0.5];
        
        negativeQuantities.forEach(quantity => {
          const item: InventoryItem = {
            id: 'test-item',
            type: 'test-type',
            status: 'available',
            quantity: quantity
          };

          expect(validateInventoryItem(item)).toBe(false);
        });
      });

      it('should handle missing quantity', () => {
        const item = {
          id: 'test-item',
          type: 'test-type',
          status: 'available' as const
          // quantity is missing
        } as InventoryItem;

        expect(validateInventoryItem(item)).toBe(false);
      });
    });

    describe('Edge Cases', () => {
      it('should handle decimal quantities', () => {
        const item: InventoryItem = {
          id: 'decimal-item',
          type: 'fuel',
          status: 'available',
          quantity: 5.5
        };

        expect(validateInventoryItem(item)).toBe(true);
      });

      it('should handle very large quantities', () => {
        const item: InventoryItem = {
          id: 'large-item',
          type: 'bulk-equipment',
          status: 'available',
          quantity: Number.MAX_SAFE_INTEGER
        };

        expect(validateInventoryItem(item)).toBe(true);
      });

      it('should handle special characters in id and type', () => {
        const item: InventoryItem = {
          id: 'item-123!@#$%^&*()',
          type: 'type_with-special.chars',
          status: 'available',
          quantity: 1
        };

        expect(validateInventoryItem(item)).toBe(true);
      });

      it('should handle whitespace in id and type', () => {
        const invalidItems = [
          {
            id: ' ',
            type: 'vehicle',
            status: 'available' as const,
            quantity: 1
          },
          {
            id: 'valid-id',
            type: ' ',
            status: 'available' as const,
            quantity: 1
          },
          {
            id: '   ',
            type: 'vehicle',
            status: 'available' as const,
            quantity: 1
          }
        ];

        // Whitespace-only should be treated as empty/invalid
        invalidItems.forEach(item => {
          expect(validateInventoryItem(item)).toBe(false);
        });
      });

      it('should handle unicode characters', () => {
        const item: InventoryItem = {
          id: 'item-español-中文-🚗',
          type: 'vehículo-especial',
          status: 'available',
          quantity: 1
        };

        expect(validateInventoryItem(item)).toBe(true);
      });
    });

    describe('Type Safety', () => {
      it('should maintain type safety for status values', () => {
        const item: InventoryItem = {
          id: 'test',
          type: 'test',
          status: 'available',
          quantity: 1
        };

        // These should be the only valid status values
        const validStatuses: Array<'available' | 'rented' | 'maintenance'> = ['available', 'rented', 'maintenance'];
        
        validStatuses.forEach(status => {
          item.status = status;
          expect(validateInventoryItem(item)).toBe(true);
        });
      });
    });

    describe('Function Properties', () => {
      it('should export validateInventoryItem as a function', () => {
        expect(typeof validateInventoryItem).toBe('function');
      });

      it('should return boolean values', () => {
        const validItem: InventoryItem = {
          id: 'test',
          type: 'test',
          status: 'available',
          quantity: 1
        };

        const invalidItem = {
          id: '',
          type: 'test',
          status: 'available' as const,
          quantity: 1
        };

        const validResult = validateInventoryItem(validItem);
        const invalidResult = validateInventoryItem(invalidItem);

        expect(typeof validResult).toBe('boolean');
        expect(typeof invalidResult).toBe('boolean');
        expect(validResult).toBe(true);
        expect(invalidResult).toBe(false);
      });
    });

    describe('Performance', () => {
      it('should handle multiple validations efficiently', () => {
        const items: InventoryItem[] = Array.from({ length: 1000 }, (_, i) => ({
          id: `item-${i}`,
          type: `type-${i % 10}`,
          status: ['available', 'rented', 'maintenance'][i % 3] as 'available' | 'rented' | 'maintenance',
          quantity: i
        }));

        const start = Date.now();
        const results = items.map(item => validateInventoryItem(item));
        const end = Date.now();

        // Should complete quickly (less than 100ms for 1000 items)
        expect(end - start).toBeLessThan(100);
        
        // All should be valid
        expect(results.every(result => result === true)).toBe(true);
      });
    });
  });

  describe('Integration', () => {
    it('should work with real-world inventory scenarios', () => {
      const carRentalInventory: InventoryItem[] = [
        {
          id: 'toyota-camry-001',
          type: 'sedan',
          status: 'available',
          quantity: 1
        },
        {
          id: 'honda-civic-002',
          type: 'compact',
          status: 'rented',
          quantity: 1
        },
        {
          id: 'ford-f150-003',
          type: 'truck',
          status: 'maintenance',
          quantity: 1
        },
        {
          id: 'child-car-seats',
          type: 'safety-equipment',
          status: 'available',
          quantity: 25
        },
        {
          id: 'gps-units',
          type: 'electronics',
          status: 'available',
          quantity: 15
        }
      ];

      carRentalInventory.forEach(item => {
        expect(validateInventoryItem(item)).toBe(true);
      });
    });
  });
});