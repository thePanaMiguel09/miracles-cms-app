import { api } from "@/config/axios";
import { UserDatasource } from "@/domain/datasources/userDatasource";
import { UserUpdateDTO } from "@/domain/dtos/userupdate.dto";
import { User, UserRegister } from "@/domain/entities/user";
import { UserApiResponse, UserModel } from "../models/userModel";


export class UserDatasourceImp implements UserDatasource {

    async createUser(user: UserRegister): Promise<void> {
        try {
            const { data, status } = await api.post('/auth/register', {
                names: user.userNames,
                surnames: user.userSurnames,
                dni: user.userDNI,
                cellphone_number: user.userPhone,
                email: user.userEmail,
                password: user.userPassword
            });
            if (status === 201) {
                return data.message;
            }

        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Error posting user', error.message);
        }
    }
    async fetchUsers(): Promise<User[]> {
        try {
            const { data } = await api.get<UserApiResponse[]>('/users');
            const userModels = data.map(UserModel.fromJSON)
            const users = userModels.map(user => user.toEntityUser());
            return users;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Error fetching users', error);
        }
    }
    async fetchUser(id: number): Promise<User | null> {
        try {
            const { data } = await api.get<UserApiResponse>(`/users/${id}`);

            const userModel = UserModel.fromJSON(data).toEntityUser();
            return userModel;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Error fething user', error);
        }

    }

    async updateUserState(id: number, state: boolean): Promise<void> {
        try {
            const { data } = await api.patch('users/update-user-state', {
                user_id: id,
                user_state: state
            });

            return data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Error updating user state', error);
        }
    }
    async updateUserCommerce(userId: number, commerceId: number | null): Promise<void> {
        try {
            const { data } = await api.patch('/users/update-user-commerce', {
                user_id: userId,
                commerce_id: commerceId
            })

            return data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Error updating user commmerce', error);
        }
    }

    async updateUserInformation(id: number, data: UserUpdateDTO): Promise<void> {
        try {
            const payload = {
                names: data.names,
                surnames: data.surnames,
                cellphone_number: data.cellphone_number,
                user_email: data.user_email,
                rol: data.rol
            };

            await api.put(`/users/${id}`, payload);

        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Error updating user information');

        }
    }



}