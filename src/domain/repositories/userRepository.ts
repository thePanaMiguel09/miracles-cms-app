import { User, UserRegister } from "../entities/user";

export abstract class UserRepository {
    abstract fetchUsers(): Promise<User[]>
    abstract createUser(data: UserRegister): Promise<void>;
}