import { User } from "../entities/user";

export abstract class AuthDataSource {
    abstract login(email: string, password: string): Promise<{user:User; token: string}>;
}