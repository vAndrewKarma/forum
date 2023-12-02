import Template from '../template'

export default class BadRequest extends Template {
  statusCode = 400
  constructor(
    public message,
    public field
  ) {
    super(message, field)
    Object.setPrototypeOf(this, BadRequest.prototype)
  }
  serializer(): { message: string; field: string } {
    return { message: this.message, field: this.field }
  }
}
