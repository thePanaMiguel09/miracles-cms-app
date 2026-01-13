import type { AuthRepository } from "../repositories/authRepository";

export class LoginUseCase {
    constructor(private readonly repository: AuthRepository) { }
    async excute(email: string, password: string): Promise<ReturnType<AuthRepository['login']>> {

        if (!email.includes('@')) {
            throw new Error('Invalid Email');
        }
        return await this.repository.login(email, password);
    }
}