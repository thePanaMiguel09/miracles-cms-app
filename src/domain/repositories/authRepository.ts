import { User } from "../entities/user";

export abstract class AuthRepository {
    abstract login(email: string, password: string): Promise<{user: User; token: string}>;
}