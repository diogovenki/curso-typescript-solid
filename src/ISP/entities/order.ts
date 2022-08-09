import { Messaging } from '../services/messaging';
import { OrderStatus } from './interfaces/order-status';
import { Persistency } from '../services/persistency';
import { ShoppingCart } from './shopping-cart';

export class Order {
    private _status: OrderStatus = 'open';
    constructor(
        private readonly shoppingCart: ShoppingCart,
        private readonly messaging: Messaging,
        private readonly persistency: Persistency,
    ) {}

    get status(): OrderStatus {
        return this._status;
    }

    checkout(): void {
        if (this.shoppingCart.isEmpty()) {
            console.log('Cart is empty');
            return;
        }

        this._status = 'closed';
        const totalFixed = this.shoppingCart.totalWithDiscountFixed();
        this.messaging.sendMessage(
            `Seu pedido com o total de ${totalFixed} foi recebido.`,
        );
        this.persistency.saveOrder();
        this.shoppingCart.clear();
    }
}
