import { jwtDecode } from "jwt-decode";

export function verifyToken(token: string) {
    const tokenDecoded = jwtDecode<any>(token);

    return tokenDecoded.exp < Date.now() / 1000;

}