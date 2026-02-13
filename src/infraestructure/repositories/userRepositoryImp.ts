import { UserDatasource } from "@/domain/datasources/userDatasource";
import { User, UserRegister } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/userRepository";


export class UserRepositoryImp extends UserRepository {


    constructor(private readonly datasource: UserDatasource) {
        super();
    };

    async createUser(data: UserRegister): Promise<void> {
        return await this.datasource.createUser(data);
    }
    async fetchUsers(): Promise<User[]> {
        return await this.datasource.fetchUsers();
    }
    async fetchUser(id: number): Promise<User | null> {
        return await this.datasource.fetchUser(id);
    }

    async updateUserState(id: number, state: boolean): Promise<void> {
        return await this.datasource.updateUserState(id, state);
    }
}