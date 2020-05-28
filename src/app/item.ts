export class Item {
    id: number;
    name: string;
    brand: string;
    categoryNames: string[];
    unitaryPrice: number;
    unitaryWeight: number;
    weightType: string;
    pictureUrl: string;

    constructor(id: number,
                name: string,
                brand: string,
                categoryNames: string[],
                unitaryPrice: number,
                unitaryWeight: number,
                weightType: string,
                pictureUrl: string) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.categoryNames = categoryNames;
        this.unitaryPrice = unitaryPrice;
        this.unitaryWeight = unitaryWeight;
        this.weightType = weightType;
        this.pictureUrl = pictureUrl;
    }
}
