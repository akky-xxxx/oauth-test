/**
 * import node_modules
 */
import Routes from "next-routes"
import { ServerConstructor } from "next/dist/next-server/server/next-server"

/**
 * main
 */
const routes = new Routes()
const getRequestHandler = (app: ServerConstructor) => {
  return routes.getRequestHandler(app)
}

export default getRequestHandler
