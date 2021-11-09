import { EmailAddres } from "../../../shared/domain/valueobjects/email/emailaddres";
import { KeyAppService } from "../../../shared/guard/application/guard-app";
import { ErrorUserAlreadyExist } from "../domain/user-exists.error";
import { IEncript } from "../../../common/libs/encrypt/IEncrypts";
import { IUserFindRepository } from "../../find/domain/user.find";
import { IUserCreateRepository } from "../domain/user.create";
import { User } from "../../shared/user";
import { userCreateParams } from "./dto";



export class UserCreateService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IUserCreateRepository,
        private readonly userFind: IUserFindRepository,
        private readonly encrypt: IEncript
    ) { }

    async handle(key: string, params: userCreateParams) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            const email = new EmailAddres(params.email)
            const password = await this.encrypt.encrypt(params.password)
            const userFind = this.userFind.byEmail(email)
            if (userFind != undefined) throw new ErrorUserAlreadyExist()
            const user = new User({ email, password, profile: params.profile })
            await this.repository.handle(user, currentUser)
            return user
        } catch (error) {
            throw error
        }
    }

}