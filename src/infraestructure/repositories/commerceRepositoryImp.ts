import { CommerceDatasource } from "@/domain/datasources/commerceDatasource";
import { Commerce } from "@/domain/entities/commerce";
import { CommerceRepository } from "@/domain/repositories/commerceRepository";


export class CommerceRepositoryImp extends CommerceRepository {

    constructor(private readonly commerceDatasource: CommerceDatasource) { super() };

    async fetchCommerces(): Promise<Commerce[]> {
        return await this.commerceDatasource.fetchCommerces();
    }

}