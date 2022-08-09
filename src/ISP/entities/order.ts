import { Messaging } from '../services/messaging';
import { OrderStatus } from './interfaces/order-status';
import { Persistency } from '../services/persistency';
import { ShoppingCart } from './shopping-cart';
import { CustomerOrderProtocol } from './interfaces/customer-protocol';

export class Order {
    private _status: OrderStatus = 'open';
    constructor(
        private readonly shoppingCart: ShoppingCart,
        private readonly messaging: Messaging,
        private readonly persistency: Persistency,
        private readonly customer: CustomerOrderProtocol,
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

        console.log('Client:', this.customer.getName(), this.customer.getIDN());
    }
}
