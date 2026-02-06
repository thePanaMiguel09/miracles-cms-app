import { api } from "@/config/axios";
import { UserDatasource } from "@/domain/datasources/userDatasource";
import { User, UserRegister } from "@/domain/entities/user";
import { UserModel } from "../models/userModel";


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
            console.error('Error posting user', { error, msg: error?.message });
            throw error;
        }
    }
    async fetchUsers(): Promise<User[]> {
        try {
            const { data } = await api.get<User[]>('/users');
            const userModels = data.map(UserModel.fromJSON)
            const users = userModels.map(user => user.toEntityUser());
            return users;
        } catch (error: any) {
            console.error('Error fetching users', error)
            throw error;
        }
    }
}