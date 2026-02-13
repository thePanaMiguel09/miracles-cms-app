import { User, UserRegister } from "../entities/user";

export abstract class UserRepository {
    abstract fetchUsers(): Promise<User[]>
    abstract createUser(data: UserRegister): Promise<void>;
    abstract fetchUser(id: number): Promise<User | null>;
    abstract updateUserState(id: number, state: boolean): Promise<void>;
}