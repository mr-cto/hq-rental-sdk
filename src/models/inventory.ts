export interface InventoryItem {
    id: string;
    type: string;
    status: 'available' | 'rented' | 'maintenance';
    quantity: number;
}

export function validateInventoryItem(item: InventoryItem): boolean {
    // Check if required fields exist and are not empty/whitespace-only
    if (!item.id || !item.type || typeof item.quantity !== 'number') {
        return false;
    }
    
    // Check for whitespace-only strings
    if (item.id.trim() === '' || item.type.trim() === '') {
        return false;
    }
    
    // Check quantity constraints
    if (item.quantity < 0) {
        return false;
    }
    
    return true;
}