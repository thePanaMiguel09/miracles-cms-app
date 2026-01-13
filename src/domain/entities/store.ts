import { StoreBranding } from "./store-branding";
import { StorePayment } from "./store-payment";

export class Store {

    constructor(
        readonly storeId: number,
        readonly storeName: string,
        readonly storeEmblem: string,
        readonly storeLogo: string,
        readonly storeAddress: string,
        readonly city: string,
        readonly state: string,
        readonly storeState: boolean,
        readonly storeBranding: StoreBranding,
        readonly storePayment: StorePayment,

    ) { }

}