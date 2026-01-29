import { api } from "@/config/axios";
import { UserDatasource } from "@/domain/datasources/userDatasource";
import { User } from "@/domain/entities/user";
import { UserModel } from "../models/userModel";


export class UserDatasourceImp implements UserDatasource {
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