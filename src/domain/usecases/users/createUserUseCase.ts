import { UserRegister } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/userRepository";


export class CreateUserUseCase   {
    constructor(private readonly repository: UserRepository){};

    async excecute(data: UserRegister) {
        return await this.repository.createUser(data);
    }
}