import { UserRepository } from "@/domain/repositories/userRepository";

export class UpdateUserCommerceUseCase {
    constructor(private readonly repository: UserRepository) { };


    async execute(userId: number, commerceId: number | null): Promise<ReturnType<UserRepository['updateUserCommerce']>> {

        if (!Number.isInteger(userId) || userId <= 0) {
            throw new Error('User ID must be a positive integer');
        }

        if (commerceId !== null && (!Number.isInteger(commerceId) || commerceId <= 0)) {
            throw new Error('Commerce ID must be a positive integer');
        }

        return await this.repository.updateUserCommerce(userId, commerceId);
    }

}