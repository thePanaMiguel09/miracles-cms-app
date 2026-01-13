import { User } from "@/domain/entities/user";

export class UserModel {
    constructor(
        public userId: number,
        public userDNI: number,
        public userEmail: string,
        public names: string,
        public surnames: string,
        public phoneNumber: number,
        public roleId: number,
        public storeId: number,
        public createdAt: Date,
        public userState?: boolean
    ) { }

    static fromJSON(json: { [key: string]: any }): UserModel {
        return new UserModel(
            json.pk_user_store_id,
            json.dni,
            json.user_email,
            json.names,
            json.surnames,
            json.cellphone_number,
            json.fk_rol_id,
            json.fk_store_id,
            new Date(json.user_date_created),
            json.user_state,


        )
    }

    toEntityUser(): User {
        return new User(
            this.userId,
            this.userDNI,
            this.userEmail,
            this.names,
            this.surnames,
            this.phoneNumber,
            this.roleId,
            this.storeId,
            this.createdAt,
            this.userState,
        )
    }
}