import { api } from "@/config/axios";
import { CommerceDatasource } from "@/domain/datasources/commerceDatasource";
import { Commerce } from "@/domain/entities/commerce";
import { CommerceApiResponse, CommerceModel } from "../models/commerceModel";


export class CommerceDatasourceImp extends CommerceDatasource {
    async fetchCommerces(): Promise<Commerce[]> {
        try {
            const { data } = await api.get<CommerceApiResponse[]>('/tenant');

            const commerceModel = data.map(CommerceModel.fromJson);

            const commerces = commerceModel.map((commerce) => commerce.toEntityCommerce());

            return commerces;

        } catch (error: any) {
            console.error('Error fetching commerces', error)
            throw error
        }
    }

}