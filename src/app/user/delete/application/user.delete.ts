import { ErrorPermissionDenied } from "../../../shared/errors/permission-denied.error";
import { KeyAppService } from "../../../shared/guard/application/guard-app";
import { Uuid } from "../../../shared/domain/valueobjects/uuid";
import { IUserDeleteRepository } from "../domain/user.create";
import { Profiles } from "../../shared/user.profiles";
import { User } from "../../shared/user";
import { IUserDeleteDTO } from "./dto";



export class UserDeleteService {

    constructor(
        private readonly decodedKeyAPP: KeyAppService,
        private readonly repository: IUserDeleteRepository
    ) { }

    async handle(key: string, params: IUserDeleteDTO) {
        try {
            const currentUser = await this.decodedKeyAPP.decodedKey(key)
            await this.permiso(currentUser)
            const id = new Uuid(params.id)
            await this.repository.handle(id, currentUser)
        } catch (error) {
            throw error
        }
    }
    private async permiso(currentUser: User) {
        if (currentUser.profile == Profiles.ROOT) return
        throw new ErrorPermissionDenied()
    }


}