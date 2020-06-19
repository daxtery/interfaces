import { ItemView } from './itemView';

export class ItemAndStock extends ItemView {
    constructor(item: ItemView, public stock: number) {
        super(item, item.category);
    }
}
