import { deleteCookie } from 'h3'

export default defineEventHandler(async event => {
  deleteCookie(event, 'access_token')
  deleteCookie(event, 'refresh_token')
  deleteCookie(event, 'user_id')
})
