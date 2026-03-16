import { CreateUserUseCase } from "@/domain/usecases/users/createUserUseCase";
import { FetchUserByIdUseCase } from "@/domain/usecases/users/fetchUserByIdUseCase";
import { FetchUsersUseCase } from "@/domain/usecases/users/fetchUsersUseCase";
import { UpdateUserCommerceUseCase } from "@/domain/usecases/users/updateUserCommerceUseCase";
import { UpdateUserInformationUseCase } from "@/domain/usecases/users/updateUserInformationUseCase";
import { UpdateUserStateUseCase } from "@/domain/usecases/users/updateUserStateUseCase";
import { UserDatasourceImp } from "@/infraestructure/datasources/userDatasourceImp";
import { UserRepositoryImp } from "@/infraestructure/repositories/userRepositoryImp";


class UserContainer {

    private static instance: UserContainer;

    private readonly repository: UserRepositoryImp;
    private readonly datasoruce: UserDatasourceImp;

    public readonly createUserUseCase: CreateUserUseCase;
    public readonly fetchUsersUseCase: FetchUsersUseCase;
    public readonly fetchUserUseCase: FetchUserByIdUseCase;
    public readonly updateUserStateUseCase: UpdateUserStateUseCase;
    public readonly updateUserCommerceUseCase: UpdateUserCommerceUseCase;
    public readonly updateUserInfoUseCase: UpdateUserInformationUseCase;

    private constructor() {
        this.datasoruce = new UserDatasourceImp();
        this.repository = new UserRepositoryImp(this.datasoruce);

        this.createUserUseCase = new CreateUserUseCase(this.repository);
        this.fetchUsersUseCase = new FetchUsersUseCase(this.repository);
        this.fetchUserUseCase = new FetchUserByIdUseCase(this.repository);
        this.updateUserStateUseCase = new UpdateUserStateUseCase(this.repository);
        this.updateUserCommerceUseCase = new UpdateUserCommerceUseCase(this.repository);
        this.updateUserInfoUseCase = new UpdateUserInformationUseCase(this.repository);
    }

    public static getInstace(): UserContainer {
        if (!this.instance) {
            UserContainer.instance = new UserContainer();
        }
        return UserContainer.instance;
    }
}

export const userContainer = UserContainer.getInstace();