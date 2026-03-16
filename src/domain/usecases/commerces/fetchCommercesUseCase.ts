import { CommerceRepository } from "@/domain/repositories/commerceRepository";


export class FetchCommercesUseCase {
    constructor(private readonly commerceRepository: CommerceRepository) { }

    async execute(): Promise<ReturnType<CommerceRepository['fetchCommerces']>> {
        return await this.commerceRepository.fetchCommerces();
    }


}