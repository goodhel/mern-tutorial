class response {
    sendResponse = (res, body) => {
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
            console.log('sendResponse response helper Error ', error)

            res.status(401).send({
                status: false,
                error
            })

            return false
        }
    }
}

module.exports = new response()