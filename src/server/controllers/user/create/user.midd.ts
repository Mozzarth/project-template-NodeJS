import { validRouterExpressValidator } from "../../../shared/middleware/express-validator.midd";
import { body, header } from "express-validator";


export function userCreateMidd(){
    return [
        //  email: string; password: string
        header("authorization").exists().isJWT(),
        body("email").exists().isString(),
        body("password").exists().isString(),
        body("profile").exists().isInt({min : 0}),
        validRouterExpressValidator
    ]
}