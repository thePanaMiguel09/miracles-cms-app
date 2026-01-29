import { User } from "../entities/user";

export abstract class UserDatasource {
    abstract fetchUsers(): Promise<User[]>
}