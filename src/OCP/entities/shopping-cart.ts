import { Discount, FixedDiscount } from './discount';
import { CartItem } from './interfaces/cart-item';

export class ShoppingCart {
    private readonly _items: CartItem[] = [];

    constructor(private readonly discount: Discount = new FixedDiscount(0)) {}

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

    totalWithDiscount(): number {
        return this.discount.calculate(this.total());
    }

    totalWithDiscountFixed(): number {
        return Math.max(0, this.totalWithDiscount());
    }

    isEmpty(): boolean {
        return this._items.length === 0;
    }

    clear(): void {
        console.log('Cleared');
        this._items.length = 0;
    }
}
