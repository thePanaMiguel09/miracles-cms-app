import { FetchUserByIdUseCase } from "@/domain/usecases/fetchUserByIdUseCase";
import { UserDatasourceImp } from "@/infraestructure/datasources/userDatasourceImp";
import { UserRepositoryImp } from "@/infraestructure/repositories/userRepositoryImp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCommerces } from "../commerces/use-commerce";
import { useRoles } from "../roles/use-roles";


const fetchUserByIdUseCase = new FetchUserByIdUseCase(new UserRepositoryImp(new UserDatasourceImp()))

const UserSchema = z.object({
    names: z.string().min(2, "Mínimo 2 caracteres").max(50),
    surnames: z.string().min(2, "Mínimo 2 caracteres").max(50),
    email: z.string().email("Email inválido"),
    phone: z.string()
        .regex(/^\d{10}$/, "Teléfono debe tener 10 dígitos"),
    role: z.number().nullable(),
    commerceId: z.number().nullable(),
    createdAt: z.string().datetime().or(z.string()),
    status: z.boolean(),
});

type UserSchemaFormValues = z.infer<typeof UserSchema>;

export const useUser = () => {

    const [editForm, setEditForm] = useState<boolean>(false);

    const { register, control, reset, formState: { errors } } = useForm<UserSchemaFormValues>({ resolver: zodResolver(UserSchema) });

    const { commercesQuery } = useCommerces();
    const { rolesQuery } = useRoles();

    const { data: commerces, isLoading: isLoadingCommerces, isError: isCommercesError, error: commercesError } = commercesQuery;
    const { data: roles, isLoading: isLoadingRoles, isError: isRolesError, error: rolesError } = rolesQuery;

    const useUserById = (id: number) => useQuery({
        queryKey: ['user', id],
        queryFn: async () => await fetchUserByIdUseCase.execute(id),
        staleTime: 1000 * 60 * 5,
    });

    const roleOptions = useMemo(() => (
        roles?.map((role) => ({
            itemValue: role.roleId,
            itemLabel: role.roleName
        })) ?? []
    ), [roles]);

    const commerceOptions = useMemo(() => (
        commerces?.map((commerce) => ({
            itemValue: commerce.commerceId,
            itemLabel: commerce.commerceName,
        })) ?? []
    ), [commerces]);

    const handleEditForm = () => setEditForm(!editForm);

    return {
        commerces,
        roles,
        commerceOptions,
        roleOptions,
        editForm,
        isLoadingRoles,
        isRolesError,
        rolesError,
        isLoadingCommerces,
        isCommercesError,
        commercesError,
        errors,
        useUserById,
        register,
        control,
        reset,
        handleEditForm
    };

}