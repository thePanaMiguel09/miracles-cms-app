import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


import { useAuthContext } from "../context/authContext";


const LoginFormSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().nonempty('Password required')
})



export const useLogin = () => {
    const { isAuthenticated, login, } = useAuthContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm({ mode: 'onBlur', resolver: zodResolver(LoginFormSchema) });

    const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
        clearErrors();
        try {
            setIsLoading(true);
            setError(null);
            await login(data.email, data.password);

        } catch (error: any) {
            setError(error.message ?? 'Login failed');
        } finally {
            setIsLoading(false)
        }

    }

    return {
        isLoading,
        isAuthenticated,
        error,
        errors,

        register,
        reset,
        onSubmit,
        handleSubmit
    }
}