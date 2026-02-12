import { FetchRolesUseCase } from "@/domain/usecases/fetchRolesUseCase";
import { RoleDatasourceImp } from "@/infraestructure/datasources/roleDatasourceImp";
import { RoleRepositoryImp } from "@/infraestructure/repositories/roleRepositoryImp";
import { useQuery } from "@tanstack/react-query";

const fetchRolesUseCase = new FetchRolesUseCase(new RoleRepositoryImp(new RoleDatasourceImp()));

export const useRoles = () => {
    const rolesQuery = useQuery({
        queryKey: ['roles'],
        queryFn: async () => await fetchRolesUseCase.execute(),
        staleTime: 1000 * 60 * 5
    })

    return {
        rolesQuery
    }
}