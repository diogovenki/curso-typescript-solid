type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCartLegacy {
    private readonly _items: CartItem[] = [];
    private _orderStatus: OrderStatus = 'open';

    addItem(item: CartItem): void {
        this._items.push(item);
    }

    removeItem(item: CartItem): void {
        this._items.splice(this._items.indexOf(item));
    }

    get items(): Readonly<CartItem[]> {
        return this._items;
    }

    get orderStatus(): OrderStatus {
        return this._orderStatus;
    }

    total(): number {
        return +this._items
            .reduce((total, item) => total + item.price, 0)
            .toFixed(2);
    }

    isEmpty(): boolean {
        return this._items.length === 0;
    }

    checkout(): void {
        if (this.isEmpty()) {
            console.log('Cart is empty');
            return;
        }

        this._orderStatus = 'closed';
        this.sendMessage(
            `Seu pedido com o total de ${this.total()} foi recebido.`,
        );
        this.saveOrder();
        this.clear();
    }

    sendMessage(message: string): void {
        console.log('Send message:', message);
    }

    saveOrder(): void {
        console.log('Saved');
    }

    clear(): void {
        console.log('Cleared');
        this._items.length = 0;
    }
}

const shoppingCart = new ShoppingCartLegacy();
shoppingCart.addItem({ name: 'item1', price: 2.45 });
shoppingCart.addItem({ name: 'item2', price: 3.45 });
shoppingCart.addItem({ name: 'item3', price: 4.45 });

console.log(shoppingCart.items);
console.log('Total', shoppingCart.total());

console.log(shoppingCart.orderStatus);
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);
