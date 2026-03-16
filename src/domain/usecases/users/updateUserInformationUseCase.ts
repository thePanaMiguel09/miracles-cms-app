// domain/usecases/user/UpdateUserInformation.usecase.ts
import { UserUpdateDTO } from "@/domain/dtos/userupdate.dto";
import { UserRepository } from "@/domain/repositories/userRepository";

export class UpdateUserInformationUseCase {
    constructor(private readonly repository: UserRepository) {}

    async execute(userId: number, data: UserUpdateDTO): Promise<void> {
        if (!Number.isInteger(userId) || userId <= 0) {
            throw new Error('User ID must be a positive integer');
        }

        if (!data.names || data.names.trim().length < 2) {
            throw new Error('El nombre debe tener al menos 2 caracteres');
        }

        if (!data.surnames || data.surnames.trim().length < 2) {
            throw new Error('Los apellidos deben tener al menos 2 caracteres');
        }

        if (!data.user_email || !this.isValidEmail(data.user_email)) {
            throw new Error('Email inválido');
        }

        if (!data.cellphone_number || !this.isValidPhone(data.cellphone_number)) {
            throw new Error('Teléfono debe tener 10 dígitos');
        }

        if (!data.rol || !Number.isInteger(data.rol) || data.rol <= 0) {
            throw new Error('Rol inválido');
        }

        await this.repository.updateUserInformation(userId, data);
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    private isValidPhone(phone: number): boolean {
        return phone > 0 && phone.toString().length === 10;
    }
}