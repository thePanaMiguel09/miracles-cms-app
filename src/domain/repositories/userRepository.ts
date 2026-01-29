import { User } from "../entities/user";

export abstract class UserRepository {
    abstract fetchUsers(): Promise<User[]>
}