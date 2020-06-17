import { CartItem } from './cartItem';

export class Order {
    constructor(public items: CartItem[], public priceTotal: number) {
    }

    public get numberOfItems(): number {
        return this.items.length;
    }
}
