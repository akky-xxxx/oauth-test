/**
 * import node_modules
 */
import express from "express"
import session from "express-session"
import next from "next"
import path from "path"
import passport from "passport"

/**
 * import middleware
 */
import getRequestHandler from "./middleware/getRequestHandler"

/**
 * import routes
 */
import auth from "./routes/auth"

/**
 * import others
 */
import nextConfig from "../next.config"

const PORT = parseInt(process.env.PORT as string, 10) || 3000
const ROOT_DIR = path.resolve(__dirname, "../")
const CLIENT_DIR = path.resolve(ROOT_DIR, "src")
const app = next({
  dir: CLIENT_DIR,
  conf: nextConfig,
})
const requestHandler = getRequestHandler(app)
const server = express()

app.prepare().then(() => {
  server.use(session({
    secret: "qwerty",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 5,
    }
  }))
  server.use(passport.initialize())
  server.use(passport.session())
  server.use(auth.router)
  server.use(auth.required)
  server.use(requestHandler)
  server.listen(PORT, (error: Error) => {
    if (error) {
      throw error
    }

    console.log("Start server.")
  })
})
