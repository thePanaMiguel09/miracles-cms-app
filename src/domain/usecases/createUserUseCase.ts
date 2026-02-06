import { UserRegister } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";


export class CreateUserUseCase   {
    constructor(private readonly repository: UserRepository){};

    async excecute(data: UserRegister) {
        return await this.repository.createUser(data);
    }
}