import { CartItem } from './interfaces/cart-item';

export class ShoppingCart {
    private readonly _items: CartItem[] = [];

    get items(): Readonly<CartItem[]> {
        return this._items;
    }

    addItem(item: CartItem): void {
        this._items.push(item);
    }

    removeItem(item: CartItem): void {
        this._items.splice(this._items.indexOf(item));
    }

    total(): number {
        return +this._items
            .reduce((total, item) => total + item.price, 0)
            .toFixed(2);
    }

    isEmpty(): boolean {
        return this._items.length === 0;
    }

    clear(): void {
        console.log('Cleared');
        this._items.length = 0;
    }
}
