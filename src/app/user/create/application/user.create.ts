import { ErrorUserAlreadyExist, ErrorUserRootAlreadyExist } from "../domain/user-exists.error";
import { ErrorPermissionDenied } from "../../../shared/errors/permission-denied.error";
import { EmailAddres } from "../../../shared/domain/valueobjects/email/emailaddres";
import { KeyAppService } from "../../../shared/guard/application/guard-app";
import { UserProfileInvalid } from "../../shared/user-profileinvalid";
import { Profiles, ProfilesValid } from "../../shared/user.profiles";
import { IEncript } from "../../../common/libs/encrypt/IEncrypts";
import { IUserFindRepository } from "../../find/domain/user.find";
import { IUserCreateRepository } from "../domain/user.create";
import { User } from "../../shared/user";
import { IUserCreateDTO } from "./dto";



export class UserCreateService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IUserCreateRepository,
        private readonly userFind: IUserFindRepository,
        private readonly encrypt: IEncript
    ) { }

    async handle(key: string, params: IUserCreateDTO) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            await this.permiso(currentUser)
            await this.validProfile(params)
            const user = await this.buildUser(params)
            await this.repository.handle(user, currentUser)
            return user.toPrimitives()
        } catch (error) {
            throw error
        }
    }

    private async buildUser(params: IUserCreateDTO) {
        const email = new EmailAddres(params.email)
        const password = await this.encrypt.encrypt(params.password)
        const userFind = await this.userFind.byEmail(email)
        if (userFind != undefined) throw new ErrorUserAlreadyExist()
        const user = new User({ email, password, profile: params.profile })
        return user
    }

    private async permiso(currentUser: User) {
        if (currentUser.profile == Profiles.ADMIN || currentUser.profile == Profiles.ROOT) return
        throw new ErrorPermissionDenied()
    }
    private async validProfile(params: IUserCreateDTO) {
        if (!ProfilesValid(params.profile)) throw new UserProfileInvalid()
        if (params.profile == Profiles.ROOT) throw new ErrorUserRootAlreadyExist()
        return
    }

}