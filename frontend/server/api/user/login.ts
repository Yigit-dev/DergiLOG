import { parseCookies } from 'h3'

export default defineEventHandler(async event => {
  const cookie = await parseCookies(event)

  return cookie
})
