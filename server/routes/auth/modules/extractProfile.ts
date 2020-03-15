/**
 * import node_modules
 */
import { Profile } from "passport-google-oauth20"

/**
 * main
 */
const extractProfile = (profile: Profile, accessToken: string, refreshToken: string) => {
  const { id, displayName } = profile

  return {
    id,
    displayName,
    accessToken,
    refreshToken,
  }
}

export default extractProfile
