import { Commerce } from "@/domain/entities/commerce";


export interface CommerceApiResponse {
    "pk_store_id": number;
    "store_name": string;
    "store_email": string;
    "store_cellphone_number": string;
    "store_address": string;
    "city": string;
    "location_state": string;
    "store_state": boolean;
    "store_emblem": string;
    "store_logo_url": string;
    "primary_color": string;
    "secondary_color": string;
    "payment_name": string;
    "payment_url": string;
}

export class CommerceModel {
    constructor(
        public commerceId: number,
        public commerceName: string,
        public commerceEmail: string,
        public commercePhone: string,
        public commerceAddress: string,
        public commerceCity: string,
        public commerceStateLoct: string,
        public commerceState: boolean,
        public commerceEmblem: string,
        public commerceLogo: string,
        public commercePrimaryColor: string,
        public commerceSecondaryColor: string,
        public commercePaymentName: string,
        public commercePaymenteAddress: string
    ) { }

    static fromJson(json: CommerceApiResponse): CommerceModel {
        return new CommerceModel(
            json.pk_store_id,
            json.store_name,
            json.store_email,
            json.store_cellphone_number,
            json.store_address,
            json.city,
            json.location_state,
            json.store_state,
            json.store_emblem,
            json.store_logo_url,
            json.primary_color,
            json.secondary_color,
            json.payment_name,
            json.payment_url
        )
    }

    toEntityCommerce(): Commerce {
        return new Commerce(
            this.commerceId,
            this.commerceName,
            this.commerceEmail,
            this.commercePhone,
            this.commerceAddress,
            this.commerceCity,
            this.commerceStateLoct,
            this.commerceState,
            this.commerceEmblem,
            this.commerceLogo,
            this.commercePrimaryColor,
            this.commerceSecondaryColor,
            this.commercePaymentName,
            this.commercePaymenteAddress
        )
    }
}