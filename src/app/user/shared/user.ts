import { EmailAddres } from "../../shared/domain/valueobjects/email/emailaddres";
import { Uuid } from "../../shared/domain/valueobjects/uuid";
import { Profiles } from "./user.profiles";


type parameters = { id?: Uuid; profile: Profiles; email: EmailAddres; password: string; };
interface IUserPrimitive { id: string; email: string; password?: string; profile: Profiles }

export class User {

    public readonly id: Uuid;
    public readonly email: EmailAddres;
    public readonly password: string;
    public readonly profile: Profiles
    // public readonly observaciones: string

    constructor(params: parameters) {
        this.id = params.id == undefined ? Uuid.random() : params.id;
        this.email = params.email;
        this.profile = params.profile;
        this.password = params.password;
    }
    toPrimitives(): IUserPrimitive {
        return {
            id: this.id.value,
            email: this.email.toString(),
            password: this.password,
            profile: this.profile
        };
    }
}