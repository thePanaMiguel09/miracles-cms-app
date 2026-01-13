import { Category } from "./category";

export class Product {
    constructor(
        readonly productId: number,
        readonly productName: string,
        readonly productDescription: string,
        readonly productPrice: number,
        readonly productPresentation: string | string[],
        readonly productCategoty: Category | Category[]

    ) { }

}