import { keyAppUseCase } from "../../../shared/guard/application/guard-app"
import { userCreateMysql } from "../repository/user-delete.mysql"
import { UserDeleteService } from "./user.delete"


const userDeleteService = new UserDeleteService(keyAppUseCase, userCreateMysql)

export { userDeleteService }