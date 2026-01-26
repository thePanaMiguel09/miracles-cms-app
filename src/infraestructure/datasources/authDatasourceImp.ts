import { jwtDecode } from "jwt-decode";

import { AuthDataSource } from "@/domain/datasources/authDatasource";
import { User } from "@/domain/entities/user";

import { UserModel } from "../models/userModel";

import { api } from "@/config/axios";

interface Token {
    user: any;
    exp: number;
    lat: number;
}

export class AuthDatasourceImp implements AuthDataSource {

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        try {
            const apiURL = process.env.EXPO_PUBLIC_API_ULR;
            const { data } = await api.post(`/auth/login`, { email, password });

            const token: string = data.token;

            const decoded = jwtDecode<Token>(token);

            const userModel = UserModel.fromJSON(decoded.user);
            return { user: userModel.toEntityUser(), token };
        } catch (error: any) {
            console.error('Error login: ' + error);
            throw error;
        }

    }

}