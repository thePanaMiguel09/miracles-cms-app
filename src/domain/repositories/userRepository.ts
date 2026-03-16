import { UserUpdateDTO } from "../dtos/userupdate.dto";
import { User, UserRegister } from "../entities/user";

export abstract class UserRepository {
    abstract createUser(data: UserRegister): Promise<void>;

    abstract fetchUsers(): Promise<User[]>
    abstract fetchUser(id: number): Promise<User | null>;

    abstract updateUserState(id: number, state: boolean): Promise<void>;
    abstract updateUserCommerce(id: number, commerceId: number | null): Promise<void>;
    abstract updateUserInformation(id: number, data: UserUpdateDTO): Promise<void>;
}