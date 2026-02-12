

export class Commerce {

    constructor(
        readonly commerceId: number,
        readonly commerceName: string,
        readonly commerceEmail: string,
        readonly commercePhone: string,
        readonly commerceAddress: string,
        readonly commerceCity: string,
        readonly commerceStateLoct: string,
        readonly commerceState: boolean,
        readonly commerceEmblem: string,
        readonly commerceLogo: string,
        readonly comercePrimaryColor: string,
        readonly commerceSecondaryColor: string,
        readonly commercePaymentName: string,
        readonly commercePaymentAddress: string

    ) { }

}