import { defineEventHandler, appendResponseHeader } from 'h3'

export default defineEventHandler(event => {
  appendResponseHeader(event, 'Access-Control-Allow-Origin', '*')
})
