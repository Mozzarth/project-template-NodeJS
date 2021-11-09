import { ErrorUserAlreadyExist } from "../../../app/user/create/domain/user-exists.error"
import { Request, Response, NextFunction} from "express"

export function handleErrorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
   //TODO Realizar los respectivos cambios para crear un diccionaio de errores
    console.log({error})
    console.log(typeof error)
    // console.log(error instanceof Error)
    console.log(error.name)
    console.log(ErrorUserAlreadyExist.name)
    // console.log(ErrorUserAlreadyExist)
    return res.status(500).send(error)
}
