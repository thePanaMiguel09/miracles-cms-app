import { UserRepository } from "../repositories/userRepository";

export class FetchUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: number): Promise<ReturnType<UserRepository['fetchUser']>> {
        if (typeof id !== 'number' || typeof id === 'undefined') {
            throw new Error('Invalid user id. User id must be a number.');
        }

        return await this.userRepository.fetchUser(id);
    }

}