export class User {

    constructor(
        readonly userDNI: number,
        readonly email: string,
        readonly names: string,
        readonly surnames: string,
        readonly phoneNumber: number,
        readonly userState: boolean,
        readonly createdAt: Date,
        readonly storeId: number | null,
        readonly roleId?: number,
        readonly roleName?: string,
        readonly userId?: number,
    ) { }
}

export class UserRegister {
    constructor(
        readonly userNames: string,
        readonly userSurnames: string,
        readonly userDNI: number,
        readonly userPhone: number,
        readonly userEmail: string,
        readonly userPassword: string
    ) { }
}