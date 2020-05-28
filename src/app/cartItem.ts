import { Item } from './item';

export class CartItem {

    quantity: number;
    item: Item;

    constructor(item: Item, quantity: number) {
        this.quantity = quantity;
        this.item = item;
    }

    public get price(): number {
        return this.item.unitaryPrice * this.quantity;
    }

    public get name(): string {
        return this.item.name;
    }

    public get brand(): string {
        return this.item.brand;
    }

}
