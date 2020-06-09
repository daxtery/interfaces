import { Item } from './item';
import { Category } from './category';

export class ItemView extends Item {

    constructor(item: Item, public category: Category) {
        super(item.id,
            item.name,
            item.brand,
            item.categoryNames,
            item.unitaryPrice,
            item.unitaryWeight,
            item.weightType,
            item.pictureUrl,
            item.calories);
    }
}
