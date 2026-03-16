import { UserRepository } from "@domain/repositories/userRepository";


export class UpdateUserStateUseCase {
    constructor(private readonly userRepository: UserRepository) { };

    async execute(id: number, state: boolean): Promise<ReturnType<UserRepository['updateUserState']>> {

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('User ID must be a positive integer');
        }

        if (typeof state !== 'boolean') {
            throw new Error('State must be a boolean value');
        }

        return await this.userRepository.updateUserState(id, state);
    }
}