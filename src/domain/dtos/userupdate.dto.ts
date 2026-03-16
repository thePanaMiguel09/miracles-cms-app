
export interface UserUpdateDTO {
    names: string;
    surnames: string;
    cellphone_number: number;
    user_email: string;
    rol: number | null;
}

export interface UpdateUserCommerceDTO {
    userId: number;
    commerceId: number;
}

export interface UpdateUserStateDTO {
    userId: number;
    state: boolean;
}