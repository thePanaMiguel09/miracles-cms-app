import { User, UserRegister } from "../entities/user";

export abstract class UserDatasource {
    abstract fetchUsers(): Promise<User[]>
    abstract createUser(user: UserRegister): Promise<void>;
    abstract fetchUser(id: number): Promise<User | null>;
}