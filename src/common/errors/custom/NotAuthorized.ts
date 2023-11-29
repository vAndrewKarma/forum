import Template from '../template'

export default class NotAuthorized extends Template {
  statusCode = 401
  constructor(public message) {
    super(message)
    Object.setPrototypeOf(this, NotAuthorized.prototype)
  }
  serializer(): { message: string } {
    return { message: this.message }
  }
}
