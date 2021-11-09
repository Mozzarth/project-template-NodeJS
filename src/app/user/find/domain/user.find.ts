import { EmailAddres } from "../../../shared/domain/valueobjects/email/emailaddres";
import { Uuid } from "../../../shared/domain/valueobjects/uuid";

export interface IUserFind {
    idUser: string,
    email: string,
    profile: number,
    password : string,
    created: Date,
    userCreate: string,
    userUpdate: string | undefined,
    updateAt: Date | undefined
}


export interface IUserFindRepository {
    all(): Promise<IUserFind[]>
    root(): Promise<IUserFind | undefined>
    byId(id: Uuid): Promise<IUserFind | undefined>
    byEmail(email: EmailAddres): Promise<IUserFind | undefined>
    byEmailAndPassword(email: EmailAddres,password : string): Promise<IUserFind | undefined>
}