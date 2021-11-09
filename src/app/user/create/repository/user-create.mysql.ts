import { User } from "../../shared/user";
import { IUserCreateRepository } from "../domain/user.create";



export class UserCreateMysql implements IUserCreateRepository {

    constructor() { }

    
    handle(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

}