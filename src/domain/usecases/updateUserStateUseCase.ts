import { UserRepository } from "../repositories/userRepository";


export class UpdateUserStateUseCase {
    constructor(private readonly userRepository: UserRepository) { };

    async execute(id: number, state: boolean): Promise<ReturnType<UserRepository['updateUserState']>> {
        return await this.userRepository.updateUserState(id, state);
    }
}