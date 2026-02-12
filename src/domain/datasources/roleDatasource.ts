import { Role } from "../entities/role";



export abstract class RoleDatasource {
    abstract fetchRoles(): Promise<Role[] | null>;
}