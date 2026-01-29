import { FetchUsersUseCase } from "@/domain/usecases/fetchUsersUseCase";
import { UserDatasourceImp } from "@/infraestructure/datasources/userDatasourceImp";
import { UserRepositoryImp } from "@/infraestructure/repositories/userRepositoryImp";
import { useQuery } from "@tanstack/react-query";

const usersUseCase = new FetchUsersUseCase(
    new UserRepositoryImp(
        new UserDatasourceImp()
    )
);

export const useUsers = () => {
    const usersQuery = useQuery({
        queryFn: () => usersUseCase.execute(),
        queryKey: ['users'],
        staleTime: 1000 * 60 * 5,
    });

    return {
        usersQuery
    }
};
