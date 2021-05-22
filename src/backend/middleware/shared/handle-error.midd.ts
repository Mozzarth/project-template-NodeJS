import { Request, Response, NextFunction} from "express"

export function handleErrorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    return res.status(500).send()
}
