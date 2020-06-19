import { CartItem } from './cartItem';

export class Order {
    constructor(public items: CartItem[], public priceTotal: number, public numberOfItems: number) {
    }
}
