import { FetchCommercesUseCase } from "@/domain/usecases/fetchCommercesUseCase"
import { CommerceDatasourceImp } from "@/infraestructure/datasources/commerceDatasourceImp"
import { CommerceRepositoryImp } from "@/infraestructure/repositories/commerceRepositoryImp"
import { useQuery } from "@tanstack/react-query"

const fetchCommercesUseCase = new FetchCommercesUseCase(new CommerceRepositoryImp(new CommerceDatasourceImp()))


export const useCommerces = () => {

    const commercesQuery = useQuery({
        queryKey: ['commerces'],
        queryFn: async () => fetchCommercesUseCase.execute(),
        staleTime: 1000 * 60 * 5
    });

    return {
        commercesQuery
    }

}