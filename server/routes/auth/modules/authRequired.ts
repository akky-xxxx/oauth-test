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
  console.log({
    // @ts-ignore
    session: req.session.passport,
    isAuthenticated: req.isAuthenticated(),
  })
  if (req.session && !req.isAuthenticated()) {
    req.session.oauth2return = req.originalUrl
    return res.redirect(ENDPOINT.LOGIN)
  }
  return next()
}

export default authRequired
