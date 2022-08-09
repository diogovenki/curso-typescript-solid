import { Messaging } from './services/messaging';
import { Order } from './entities/order';
import { Persistency } from './services/persistency';
import Product from './entities/product';
import { ShoppingCart } from './entities/shopping-cart';

const shoppingCart = new ShoppingCart();
shoppingCart.addItem(new Product('item1', 2.45));
shoppingCart.addItem(new Product('item2', 3.45));
shoppingCart.addItem(new Product('item3', 4.45));

const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);

console.log(shoppingCart.items);
console.log('Total', shoppingCart.total());

console.log(order.status);
order.checkout();
console.log(order.status);
