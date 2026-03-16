import { userContainer } from "@/presentation/di/containers/userContainer";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
    const usersQuery = useQuery({
        queryFn: async () => await userContainer.fetchUsersUseCase.execute(),
        queryKey: ['users'],
        staleTime: 1000 * 60 * 5,
    });

    return {
        usersQuery
    }
};
