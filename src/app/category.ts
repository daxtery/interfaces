export class Category {
    name: string;
    child?: Category;

    static compatableWith(c1: Category, c2: Category): boolean {
        if (c1.name !== c2.name) { return false; }

        if (c1.child && c2.child) {
            return Category.compatableWith(c1.child, c2.child);
        }

        return true;
    }
}
