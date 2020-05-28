export class Category {
    name: string;
    imageURL: string;
    children?: Category[];
    parent?: Category;

    static inCategoryList(category: Category, categoryList: string[]) {
        // ["Daisy", "Milk", "Low Fat Milk"]

        // {
        //    name = "Daisy",
        //             
        // }

        for (const categoryName of categoryList) {
            if (categoryName === category.name) { return true; }
        }

        return false;
    }
}
