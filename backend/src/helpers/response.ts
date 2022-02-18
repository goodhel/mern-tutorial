import { Response } from "express"

class response {
    sendResponse = (res: Response, body: any) => {
        try {
            if (body.code) {
                res.status(body.code)
                delete body.code
                res.send(body)

                return true
            }

            res.status(body && body.status ? 200 : 400)
            res.send(body)

            return true
        } catch (error) {
            console.log('sendResponse response module Error ', error)

            res.status(401).send({
                status: false,
                error
            })

            return false
        }
    }
}

export default new response()