/**
 * import node_modules
 */
import { Request, Response, NextFunction } from "express"
import axios, { AxiosResponse } from "axios"
import dotenv from "dotenv"

/**
 * main
 */
dotenv.config()

interface GoogleOauth {
  access_token: string
  expires_in: number
  scope: string
  token_type: "Bearer"
  id_token: string
}

const ENDPOINT = "https://www.googleapis.com/oauth2/v4/token"
const refreshToken = async (req: Request, _res: Response, next: NextFunction) => {
  const { session } = req
  if (!session || !session.passport) {
    next()
    return
  }

  const { passport: { user } } = session
  const postData = {
    refresh_token: user.refreshToken,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "refresh_token",
  }
  const result: AxiosResponse<GoogleOauth> = await axios.post(ENDPOINT, postData)
  console.log({
    result: result.data,
  })

  const { data: { access_token } } = result
  user.accessToken = access_token
  next()
}

export default refreshToken
