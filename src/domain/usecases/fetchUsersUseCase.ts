import type { UserRepository } from "../repositories/userRepository";

export class FetchUsersUseCase {

    constructor(private readonly repository: UserRepository) { }

    async execute(): Promise<ReturnType<UserRepository['fetchUsers']>> {
        return await this.repository.fetchUsers();
    }
}