import { userCreateRootController as ctrlCreateRoot } from '../controllers/user/create-root/user.controller'
import { userCreateController as ctrlCreate } from '../controllers/user/create/user.controller'
import { userDeleteController as ctrlDelete } from '../controllers/user/delete/user.controller'
import { userLoginController as ctrlLogin } from '../controllers/user/login/user.controller'
import { userRootCreateMidd } from '../controllers/user/create-root/user.midd'
import { userLoginCreateMidd } from '../controllers/user/login/user.midd'
import { userDeleteMidd } from '../controllers/user/delete/user.midd'
import { userCreateMidd } from '../controllers/user/create/user.midd'
import { Router } from 'express'

const rt = Router()


rt.post("/userRoot", userRootCreateMidd(), ctrlCreateRoot.handle.bind(ctrlCreateRoot))
rt.post("/userAuth", userLoginCreateMidd(), ctrlLogin.handle.bind(ctrlLogin))
rt.post("/user", userCreateMidd(), ctrlCreate.handle.bind(ctrlCreate))
rt.delete("/user/:id", userDeleteMidd(), ctrlDelete.handle.bind(ctrlDelete))
// userAuthentication

export { rt as userRT }