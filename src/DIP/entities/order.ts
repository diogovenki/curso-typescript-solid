import { OrderStatus } from './interfaces/order-status';
import { CustomerOrderProtocol } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MessagingProtocol } from '../services/interfaces/messagin-protocol';
import { PersistencyProtocol } from '../services/interfaces/persistency-protocol';

export class Order {
    private _status: OrderStatus = 'open';
    constructor(
        private readonly shoppingCart: ShoppingCartProtocol,
        private readonly messaging: MessagingProtocol,
        private readonly persistency: PersistencyProtocol,
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
