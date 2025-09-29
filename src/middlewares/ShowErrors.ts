import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator";

const ShowErrors = (req: Request, res: Response, next: NextFunction) => {

    const validation = validationResult(req)

    if (!validation.isEmpty()) {
        res.status(400).json({ errors: validation.array() })
        return;
    }
    next()


}

export default ShowErrors;