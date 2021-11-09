import { userCreateRootController as ctrlCreate } from '../controllers/user/create-root/user.controller'
import { userLoginController as ctrlLogin } from '../controllers/user/login/user.controller'
import { userRootCreateMidd } from '../controllers/user/create-root/user.midd'
import { userLoginCreateMidd } from '../controllers/user/login/user.midd'
import { Router } from 'express'

const rt = Router()


rt.post("/userRoot", userRootCreateMidd(), ctrlCreate.handle.bind(ctrlCreate))
rt.post("/userAuth", userLoginCreateMidd(), ctrlLogin.handle.bind(ctrlLogin))
// userAuthentication

export { rt as userRT }