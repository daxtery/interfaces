import { Category } from './category';

export class Item {
    id: number;
    name: string;
    brand: string;
    category: Category;
    unitaryPrice: number;
    unitaryWeight: number;
    weightType: string;
    pictureUrl: string;
}
