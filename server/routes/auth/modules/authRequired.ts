/**
 * import node_modules
 */
import { NextFunction, Request, Response } from "express"

/**
 * import others
 */
import { ENDPOINT } from "../const"

/**
 * main
 */
const authRequired = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && !req.isAuthenticated()) {
    req.session.oauth2return = req.originalUrl
    return res.redirect(ENDPOINT.LOGIN)
  }
  return next()
}

export default authRequired
