import Template from '../template'

export default class Notfound extends Template {
  statusCode = 404
  constructor(public message) {
    super(message)
    Object.setPrototypeOf(this, Notfound.prototype)
  }
  serializer(): { message: string } {
    return { message: this.message }
  }
}
