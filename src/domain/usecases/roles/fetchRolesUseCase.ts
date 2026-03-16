import { RoleRepository } from "@/domain/repositories/roleRepository";

export class FetchRolesUseCase {
    constructor(private readonly rolesRepository: RoleRepository) { }

    async execute(): Promise<ReturnType<RoleRepository['fetchRoles']>> {
        return await this.rolesRepository.fetchRoles();
    }

}