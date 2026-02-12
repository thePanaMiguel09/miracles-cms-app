import { Commerce } from "../entities/commerce";


export abstract class CommerceRepository {
    abstract fetchCommerces(): Promise<Commerce[]>;
}