import { UserUpdateDTO } from "@/domain/dtos/userupdate.dto";
import { userContainer } from "@/presentation/di/containers/userContainer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const UpdateUserSchema = z.object({
    names: z.string().min(1, 'El nombre es requerido'),
    surnames: z.string().min(1, 'Los apellidos son requeridos'),
    email: z.email('Ingrese una dirección de correo válida'),
    phone: z.string().regex(/^\d{10}$/, "Teléfono debe tener 10 dígitos"),
    roleId: z.number().nullable(),
    commerceId: z.number().nullable(),
    status: z.boolean()

});

type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const updateUserInformationMutation = useMutation({
        mutationFn: async ({ userId, data }: {
            userId: number;
            data: UserUpdateDTO
        }) => { await userContainer.updateUserInfoUseCase.execute(userId, data) },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Error while updating user information,', error)
        }
    });

    const updateUserStateMutation = useMutation({
        mutationFn: async ({ userId, state }: { userId: number, state: boolean }) => { await userContainer.updateUserStateUseCase.execute(userId, state) },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (error) => {
            console.error('Erro while updating user state', error)
        }
    });

    const updateUserCommerceMutation = useMutation({
        mutationFn: async ({ userId, commerceId }: { userId: number, commerceId: number | null }) => { await userContainer.updateUserCommerceUseCase.execute(userId, commerceId) },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error('Error while updating user commerce', error)
        }
    });

    const handleUpdateCompleteUser = async (userId: number, payload: UpdateUserSchemaType) => {
        const promises: Promise<void>[] = [];

        const informationData: UserUpdateDTO = {
            names: payload.names,
            surnames: payload.surnames,
            cellphone_number: Number(payload.phone),
            user_email: payload.email,
            rol: payload.roleId
        };


        promises.push(
            updateUserInformationMutation.mutateAsync({
                userId,
                data: informationData
            })
        );

        if (payload.status !== undefined) {
            promises.push(
                updateUserStateMutation.mutateAsync({
                    userId,
                    state: payload.status
                })
            )
        }

        if (payload.commerceId !== undefined) {
            promises.push(
                updateUserCommerceMutation.mutateAsync({
                    userId,
                    commerceId: payload.commerceId
                })
            )
        }

        const results = await Promise.allSettled(promises);

        const errors = results
            .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
            .map(r => r.reason);

        if (errors.length > 0) {
            const errorMessages = errors
                .map(e => (e instanceof Error ? e.message : String(e)))
                .join(', ');
            throw new Error(`Error al actualizar usuario: ${errorMessages}`);
        }

    }

    return {
        isUpdating: updateUserInformationMutation.isPending || updateUserCommerceMutation.isPending || updateUserStateMutation.isPending,
        handleUpdateCompleteUser,
    }
}
