import { UpdateUserStateUseCase } from "@/domain/usecases/updateUserStateUseCase";
import { UserDatasourceImp } from "@/infraestructure/datasources/userDatasourceImp";
import { UserRepositoryImp } from "@/infraestructure/repositories/userRepositoryImp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const updateUserStateUseCase = new UpdateUserStateUseCase(new UserRepositoryImp(new UserDatasourceImp()));

interface UpdateUserProps {
    id: number;
    state: boolean;
}


export const useUpdateUserState = () => {

    const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
    const [userToUpdateState, setUserToUpdateState] = useState<UpdateUserProps | null>(null);
    const [informationModal, setInformationModal] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const handleConfirmationModal = () => setConfirmationModal(false);

    const handleInformationModal = () => setInformationModal(!informationModal);

    const openConfirmationModal = (userId: number, currentState: boolean) => {
        setUserToUpdateState({ id: userId, state: !currentState });
        setConfirmationModal(true);
    };

    const updateUserStateQuery = useMutation({
        mutationFn: async ({ id, state }: UpdateUserProps) => {
            await updateUserStateUseCase.execute(id, state)
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', variables.id] });

            setConfirmationModal(false);
            setUserToUpdateState(null);
            setInformationModal(true);

            setTimeout(() => {
                setInformationModal(false);
                updateUserStateQuery.reset();
            }, 3000);
        },
        onError: (error) => {
            console.error(error)
        }
    });

    const handleConfirmUpdate = () => {
        if (userToUpdateState) {
            updateUserStateQuery.mutate(userToUpdateState);
        }
    }

    return {
        confirmationModal,
        informationModal,
        isUpdating: updateUserStateQuery.isPending,
        isSuccess: updateUserStateQuery.isSuccess,
        handleConfirmationModal,
        handleInformationModal,
        openConfirmationModal,
        handleConfirmUpdate,
        updateUserStateQuery,
    }
}