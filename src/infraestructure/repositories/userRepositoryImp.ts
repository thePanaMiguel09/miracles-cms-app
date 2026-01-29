import { UserDatasource } from "@/domain/datasources/userDatasource";
import { User } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/userRepository";


export class UserRepositoryImp extends UserRepository {

    constructor(private readonly datasource: UserDatasource) {
        super();
    };

    async fetchUsers(): Promise<User[]> {
        return await this.datasource.fetchUsers();
    }
}