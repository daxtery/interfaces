export class Item {

    constructor(public id: number,
                public name: string,
                public brand: string,
                public categoryNames: string[],
                public unitaryPrice: number,
                public unitaryWeight: number,
                public weightType: string,
                public pictureUrl: string,
                public calories: number) { }
}
