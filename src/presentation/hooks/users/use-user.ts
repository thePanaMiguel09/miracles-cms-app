import { FecthUserByIdUseCase } from "@/domain/usecases/fetchUserByIdUseCase";
import { UserDatasourceImp } from "@/infraestructure/datasources/userDatasourceImp";
import { UserRepositoryImp } from "@/infraestructure/repositories/userRepositoryImp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCommerces } from "../commerces/use-commerce";
import { useRoles } from "../roles/use-roles";


const fetchUserByIdUseCase = new FecthUserByIdUseCase(new UserRepositoryImp(new UserDatasourceImp()))

const UserSchema = z.object({
    names: z.string(),
    surnames: z.string(),
    email: z.email(),
    phone: z.string(),
    role: z.number().optional().nullable(),
    createdAt: z.string(),
    status: z.boolean(),
    commerceId: z.number().optional().nullable(),
});

type UserSchemaFormValues = z.infer<typeof UserSchema>;

export const useUser = () => {

    const { register, control, reset, formState: { errors } } = useForm<UserSchemaFormValues>({ resolver: zodResolver(UserSchema), });

    const { commercesQuery } = useCommerces();
    const { rolesQuery } = useRoles();

    const { data: commerces, isLoading: isLoadingCommerces, isError: isCommercesError, error: commercesError } = commercesQuery;
    const { data: roles, isLoading: isLoadingRoles, isError: isRolesError, error: rolesError } = rolesQuery;

    const useUserById = (id: number) => useQuery({
        queryKey: ['user', id],
        queryFn: async () => await fetchUserByIdUseCase.execute(id),
        staleTime: 1000 * 60 * 5,
    });

    return { commerces, roles, isLoadingRoles, isRolesError, rolesError, isLoadingCommerces, isCommercesError, commercesError, errors, useUserById, register, control, reset, };

}