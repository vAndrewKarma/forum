import Template from '../template'

export default class BadCookie extends Template {
  statusCode = 400
  constructor(public message) {
    super(message)
    Object.setPrototypeOf(this, BadCookie.prototype)
  }
  serializer(): { message: string } {
    return { message: this.message }
  }
}
