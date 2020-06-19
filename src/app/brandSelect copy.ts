import { ItemAndStock } from './ItemAndStock';

export class Ordering {

    constructor(public orders: string[],
                public ascendingOrder: Map<string, boolean>,
                public orderMapping: Map<string, (a: ItemAndStock) => number>) { }
}
