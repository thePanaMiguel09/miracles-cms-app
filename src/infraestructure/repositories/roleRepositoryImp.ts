import { RoleDatasource } from "@/domain/datasources/roleDatasource";
import { Role } from "@/domain/entities/role";
import { RoleRepository } from "@/domain/repositories/roleRepository";


export class RoleRepositoryImp extends RoleRepository {
    
    constructor(private readonly roleDatasource: RoleDatasource){super()}
    
    async fetchRoles(): Promise<Role[] | null> {
        return await this.roleDatasource.fetchRoles();
    }

}