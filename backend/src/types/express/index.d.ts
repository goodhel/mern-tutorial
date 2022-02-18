/* eslint-disable no-unused-vars */
interface PayloadUser {
    i: string
    n: string
    e: string
}
  
declare namespace Express {
    interface Request {
        user: PayloadUser
    }
}
  