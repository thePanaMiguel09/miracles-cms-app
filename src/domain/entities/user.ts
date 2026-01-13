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