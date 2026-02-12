import { Commerce } from "../entities/commerce";


export abstract class CommerceDatasource {
    abstract fetchCommerces(): Promise<Commerce[]>
}