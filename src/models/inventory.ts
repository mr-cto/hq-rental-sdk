export interface InventoryItem {
    id: string;
    type: string;
    status: 'available' | 'rented' | 'maintenance';
    quantity: number;
}

export function validateInventoryItem(item: InventoryItem): boolean {
    if (!item.id || !item.type || item.quantity < 0) {
        return false;
    }
    return true;
}