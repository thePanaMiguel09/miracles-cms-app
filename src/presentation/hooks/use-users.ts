import { User } from "@/domain/entities/user";
import { FetchUsersUseCase } from "@/domain/usecases/fetchUsersUseCase";
import { UserDatasourceImp } from "@/infraestructure/datasources/userDatasourceImp";
import { UserRepositoryImp } from "@/infraestructure/repositories/userRepositoryImp";
import { useCallback, useEffect, useState } from "react";

const usersUseCase = new FetchUsersUseCase(
    new UserRepositoryImp(
        new UserDatasourceImp()
    )
);

export const useUsers = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const getUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const users = await usersUseCase.execute();
            setUsers(users);

        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return {
        users,
        isLoading,
        error,
        refetch: getUsers
    };
};
