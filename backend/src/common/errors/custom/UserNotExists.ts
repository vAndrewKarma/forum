import Template from '../template'

export default class UserNotExists extends Template {
  statusCode = 400
  constructor(public message) {
    super(message)
    Object.setPrototypeOf(this, UserNotExists.prototype)
  }
  serializer(): { message: string } {
    return { message: this.message }
  }
}
