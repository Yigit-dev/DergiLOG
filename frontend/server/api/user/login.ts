import { parseCookies } from "h3"
export default defineEventHandler((event) => parseCookies(event))