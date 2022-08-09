import { CartItem } from './cart-item';

export interface ShoppingCartProtocol {
    get items(): Readonly<CartItem[]>;
    addItem(item: CartItem): void;
    removeItem(item: CartItem): void;
    total(): number;
    totalWithDiscount(): number;
    totalWithDiscountFixed(): number;
    isEmpty(): boolean;
    clear(): void;
}
