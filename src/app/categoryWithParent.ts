import { Category } from './category';

export class CategoryWithParent {

    base: Category;
    parent?: CategoryWithParent;
    child?: CategoryWithParent;

    constructor(base: Category) {
        this.base = base;
    }

    static intersects(cw: CategoryWithParent, category: Category) {

        let currentP = cw;

        // let's go to the base
        while (currentP.parent) {
            currentP = currentP.parent;
        }

        let current = category;

        // we are at the base
        while (true) {
            if (!current.child && currentP.child) {
                return false;
            } else if (current.child && !currentP.child) {
                return false;
            } else if (!current.child && !currentP.child) {
                return current.name === currentP.base.name;
            } else {
                // here they BOTH HAVE a child
                if (current.name !== currentP.base.name) {
                    return false;
                }
                current = current.child;
                currentP = currentP.child;
            }
        }

    }

}
