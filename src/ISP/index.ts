import { Messaging } from './services/messaging';
import { Order } from './entities/order';
import { Persistency } from './services/persistency';
import Product from './entities/product';
import { ShoppingCart } from './entities/shopping-cart';
import { PercentDiscount, FixedDiscount } from './entities/discount';

const percentDiscount = new PercentDiscount(110);
const fixedDiscount = new FixedDiscount(12);

const shoppingCart = new ShoppingCart(percentDiscount);
shoppingCart.addItem(new Product('item1', 2.45));
shoppingCart.addItem(new Product('item2', 3.45));
shoppingCart.addItem(new Product('item3', 4.45));

const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);

console.log(shoppingCart.items);
console.log('Total', shoppingCart.total());
console.log('Total with discount', shoppingCart.totalWithDiscount());
console.log('Total with discount/Fixed', shoppingCart.totalWithDiscountFixed());

console.log(order.status);
order.checkout();
console.log(order.status);
