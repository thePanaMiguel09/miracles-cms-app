import { RoleRepositoryImp } from "@/infraestructure/repositories/roleRepositoryImp";


export class FetchRolesUseCase {
    constructor(private readonly rolesRepository: RoleRepositoryImp) { }

    async execute(): Promise<ReturnType<RoleRepositoryImp['fetchRoles']>> {
        return await this.rolesRepository.fetchRoles();
    }

}