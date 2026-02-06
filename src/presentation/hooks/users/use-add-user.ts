import { CreateUserUseCase } from '@/domain/usecases/createUserUseCase';
import { UserDatasourceImp } from '@/infraestructure/datasources/userDatasourceImp';
import { UserRepositoryImp } from '@/infraestructure/repositories/userRepositoryImp';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const createUserUseCase = new CreateUserUseCase(
    new UserRepositoryImp(
        new UserDatasourceImp()
    )
);


const UserRegisterSchema = z.object({
    userNames: z.string().min(1, 'Los nombres son requeridos'),

    userSurnames: z.string().min(1, 'Los apellidos son requeridos'),

    userDNI: z
        .string().trim()
        .regex(/^\d{8,10}$/, 'El DNI debe tener 8-10 dígitos'),

    userPhone: z
        .string()
        .regex(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),

    userEmail: z.string().email('Ingrese un correo válido'),

    userPassword: z.string().min(6, 'Mínimo 6 caracteres'),
});



type UserRegisterFormValues = z.infer<typeof UserRegisterSchema>;


export const useAddUser = () => {

    const [confirmationModalVisible, setConfirmationModalVisible] = useState<boolean>(false);

    const queryClient = useQueryClient()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserRegisterFormValues>({
        resolver: zodResolver(UserRegisterSchema),
        mode: 'onSubmit',
        defaultValues: {
            userNames: '',
            userSurnames: '',
            userDNI: '',
            userPhone: '',
            userEmail: '',
            userPassword: '',
        },
    });

    const createUserMutation = useMutation({
        mutationFn: async (data: UserRegisterFormValues) => {

            const payload = {
                ...data,
                userDNI: Number(data.userDNI),
                userPhone: Number(data.userPhone),
            };

            await createUserUseCase.excecute(payload);
            queryClient.invalidateQueries({ queryKey: ['users'] })
            reset();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            reset();
        },
        onError: (error: any) => console.error(error)
    });


    const onSubmit: SubmitHandler<UserRegisterFormValues> = (data) => {
        createUserMutation.mutate(data);
    };
    return {
        errors,
        control,
        handleSubmit,
        onSubmit,
        confirmationModalVisible,

        setConfirmationModalVisible,
        isLoading: createUserMutation.isPending,
        isSuccess: createUserMutation.isSuccess,
        isError: createUserMutation.isError,
        apiError:
            (createUserMutation.error as any)?.response?.data?.message ||
            null,
    };
};
