import { api } from "@/config/axios";
import { RoleDatasource } from "@/domain/datasources/roleDatasource";
import { Role } from "@/domain/entities/role";
import { RoleApiResponse, RoleModel } from "../models/roleModel";


export class RoleDatasourceImp extends RoleDatasource {



    async fetchRoles(): Promise<Role[] | null> {
        try {
            const { data } = await api.get<RoleApiResponse[]>('/roles');

            const roleModel = data.map(RoleModel.fromJson);

            const roles = roleModel.map((role) => role.toEntityRole());
            return roles;

        } catch (error: any) {
            console.error('Error fetching roles', error);
            throw error;
        }
    }

}