import Template from '../template'

export default class Csrf extends Template {
  statusCode = 409

  constructor(public message) {
    super(message)
    Object.setPrototypeOf(this, Csrf.prototype)
  }
  serializer(): { message: string } {
    return { message: this.message }
  }
}
