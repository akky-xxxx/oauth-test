/**
 * import node_modules
 */
import express, { Request } from "express"
import passport from "passport"
import passportGoogleOauth2 from "passport-google-oauth20"
import dotenv from "dotenv"

/**
 * import others
 */
import { ENDPOINT, STRATEGY_NAME } from "./const"
import extractProfile from "./modules/extractProfile"
import authRequired from "./modules/authRequired"

/**
 * main
 */
dotenv.config()
const GoogleStrategy = passportGoogleOauth2.Strategy
const router = express.Router()

/**
 * passport
 */
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  callbackURL: process.env.CALLBACK_URL as string,
}, (accessToken, refreshToken, profile, cb) => {
  cb(undefined, extractProfile(profile, accessToken, refreshToken))
}))

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

/**
 * router
 */
router.get(
  ENDPOINT.LOGIN,
  (req, _res, next) => {
    if (req.query.return && req.session) {
      req.session.oauth2return = req.query.return
    }

    next()
  },
  passport.authenticate(STRATEGY_NAME, { scope: ["email", "profile"], accessType: "offline" })
)

interface ThisRequest extends Request {
  session?: any
}

router.get(
  ENDPOINT.CALLBACK,
  passport.authenticate(STRATEGY_NAME),
  (req: ThisRequest, res) => {
    if (!req.session) return res.redirect("/")
    const redirect = req.session.oauth2return || '/';
    delete req.session.oauth2return;
    return res.redirect(redirect);
  }
)

router.get(
  ENDPOINT.LOGOUT,
  (req, res) => {
    req.logout()
    res.redirect("/")
  }
)

export default {
  router,
  required: authRequired,
}
