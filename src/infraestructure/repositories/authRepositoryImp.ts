import { AuthDataSource } from "@/domain/datasources/authDatasource";
import { User } from "@/domain/entities/user";
import { AuthRepository } from "@/domain/repositories/authRepository";

export class AuthRepositoryImp extends AuthRepository {

    constructor(private readonly datasource: AuthDataSource) {
        super()
    }

    async login(email: string, password: string): Promise<{user: User; token: string}> {
        return await this.datasource.login(email, password);
    }

}