import { User } from "@/domain/entities/user";

export interface UserApiResponse {
    pk_user_store_id?: number;
    dni: number;
    user_email: string;
    names: string;
    surnames: string;
    cellphone_number: string;
    user_state: boolean;
    user_date_created: Date;
    fk_store_id: number | null;
    fk_rol_id: number | null;
    rol_name?: string;
}

export class UserModel {
    constructor(
        public dni: number,
        public names: string,
        public surnames: string,
        public email: string,
        public phoneNumber: number,
        public createdAt: Date,
        public userState: boolean,
        public roleId?: number | undefined,
        public roleName?: string,
        public storeId?: number | null,
        public id?: number,
    ) { }

    static fromJSON(json: UserApiResponse): UserModel {
        return new UserModel(
            json.dni,
            json.names,
            json.surnames,
            json.user_email,
            Number(json.cellphone_number),
            new Date(json.user_date_created),
            json.user_state,
            json?.fk_rol_id ?? undefined,
            json?.rol_name,
            json?.fk_store_id ?? null,
            json?.pk_user_store_id,
        )
    }

    toEntityUser(): User {
        return new User(
            this.dni,
            this.email,
            this.names,
            this.surnames,
            this.phoneNumber,
            this.userState,
            this.createdAt,
            this?.storeId ?? null,
            this?.roleId,
            this?.roleName,
            this?.id
        )
    }
}