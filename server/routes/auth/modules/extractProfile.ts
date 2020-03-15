/**
 * import node_modules
 */
import { Profile } from "passport-google-oauth20"

/**
 * main
 */
const extractProfile = (profile: Profile) => {
  const { id, displayName } = profile

  return {
    id,
    displayName,
  }
}

export default extractProfile
