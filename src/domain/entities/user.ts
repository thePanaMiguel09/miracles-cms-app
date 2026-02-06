export class User {

    constructor(
        readonly userId: number,
        readonly userDNI: number,
        readonly email: string,
        readonly names: string,
        readonly surnames: string,
        readonly phoneNumber: number,
        readonly roleId: number,
        readonly storeId: number,
        readonly createdAt: Date,
        readonly userState?: boolean,
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