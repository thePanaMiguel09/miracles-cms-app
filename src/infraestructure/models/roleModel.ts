import { Role } from "@/domain/entities/role";

export interface RoleApiResponse {
    pk_rol_id: number;
    rol_name: string;
}

export interface RoleApiWrapperResponse {
    message: string;
    data: RoleApiResponse[];
    success: boolean;
}


export class RoleModel {
    constructor(
        public roleId: number,
        public roleName: string
    ) { }

    static fromJson(json: RoleApiResponse): RoleModel {
        return new RoleModel(
            json.pk_rol_id,
            json.rol_name
        )
    };

    toEntityRole(): Role {
        return new Role(
            this.roleId,
            this.roleName
        )
    };

}