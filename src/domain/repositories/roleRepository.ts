import { Role } from "../entities/role";



export abstract class RoleRepository {
    abstract fetchRoles(): Promise<Role[] | null>;
}