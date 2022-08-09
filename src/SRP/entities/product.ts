import { CartItem } from './interfaces/cart-item';

export default class Product implements CartItem {
    constructor(public name: string, public price: number) {}
}
