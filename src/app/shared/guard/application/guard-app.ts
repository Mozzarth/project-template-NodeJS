import { IUserFindRepository } from "../../../user/find/domain/user.find"
import { UserNotExisteError } from "../../../user/shared/user-notexists.error"
import { userFindMysql } from "../../../user/find/repository/user-find.mysql"
import { EmailAddres } from "../../domain/valueobjects/email/emailaddres"
import { JwtRepository } from "../../../common/libs/encoder/encoder.jwt"
import { IEncoderAPP } from "../../../common/libs/encoder/IEncoder"
import { IPayloadAPP } from "../../domain/IPayloadAPP"
import { Uuid } from "../../domain/valueobjects/uuid"
import { User } from "../../../user/shared/user"

export class KeyAppService {

    constructor(
        private readonly provider: IEncoderAPP<IPayloadAPP>,
        private readonly repository: IUserFindRepository
    ) {
    }
    async getKey(payload: IPayloadAPP): Promise<string> {
        const key = this.provider.getKey(payload)
        return key
    }
    async decodedKey(key: string): Promise<User> {
        const payload = await this.provider.decodedKey(key)
        const id = new Uuid(payload.id)
        const user = await this.repository.byId(id)
        if (user == undefined) throw new UserNotExisteError()
        const userParameters = { email: new EmailAddres(user.email), password: user.password, profile: user.profile, id: new Uuid(user.idUser) }
        const currentUser = new User(userParameters)
        return currentUser
    }
}


const jwtRepository = new JwtRepository<IPayloadAPP>()
const keyAppUseCase = new KeyAppService(jwtRepository, userFindMysql)
export { keyAppUseCase }