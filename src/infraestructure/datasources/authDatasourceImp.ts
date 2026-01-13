import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { AuthDataSource } from "@/domain/datasources/authDatasource";
import { User } from "@/domain/entities/user";

import { UserModel } from "../models/userModel";

interface Token {
    user: any;
    exp: number;
    lat: number;
}

export class AuthDatasourceImp implements AuthDataSource {

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const apiURL = process.env.EXPO_BASE_URL;

        const { data } = await axios.post(`${apiURL}/auth/login`, { email, password });

        const token: string = data.token;

        const decoded = jwtDecode<Token>(token);

        const userModel = UserModel.fromJSON(decoded.user);
        return { user: userModel.toEntityUser(), token };
    }

}