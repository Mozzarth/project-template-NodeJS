import { ErrorPermissionDenied } from "../../../shared/errors/permission-denied.error";
import { EmailAddres } from "../../../shared/domain/valueobjects/email/emailaddres";
import { KeyAppService, keyAppUseCase } from "../../../shared/guard/application/guard-app";
import { Uuid } from "../../../shared/domain/valueobjects/uuid";
import { IUserFindRepository } from "../domain/user.find";
import { Profiles } from "../../shared/user.profiles";
import { userFindMysql } from "../repository/user-find.mysql";




export class UserFindService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IUserFindRepository) { }

    async byId(key: string, id: string) {
        try {
            const currentUser = await this.getCurrentUser(key)
            const uuid = new Uuid(id)
            const user = await this.repository.byId(uuid)
            return user
            if (user) {
                let userPrimitives = user
                // delete userPrimitives.password
                return userPrimitives
            }
            return undefined
        } catch (error) {
            throw error
        }
    }
    async byEmail(key: string, email: string) {
        try {
            const currentUser = await this.getCurrentUser(key)
            const emailAdress = new EmailAddres(email)
            const user = await this.repository.byEmail(emailAdress)
            if (user) {
                let userPrimitives = user
                // delete userPrimitives.password
                return userPrimitives
            }
            return undefined
        } catch (error) {
            throw error
        }
    }
    async allUser(key: string) {
        try {
            const currentUser = await this.getCurrentUser(key)
            const user = await this.repository.all()
            const userMap = user.map(u => {
                let userPrimitives = u
                // delete userPrimitives.password
                return userPrimitives
            })
            return userMap
        } catch (error) {
            throw error
        }
    }

    private async getCurrentUser(key: string) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            if (currentUser.profile == Profiles.ROOT || Profiles.ADMIN) return currentUser
            throw new ErrorPermissionDenied()
        } catch (error) {
            throw error
        }
    }

}

const userFindService = new UserFindService(keyAppUseCase, userFindMysql)
export { userFindService }