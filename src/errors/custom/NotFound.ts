import Template from '../template'

export default class NotFound extends Template {
  statusCode: number = 404

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, NotFound.prototype)
  }
  serializer(): { message: string } {
    return { message: this.message }
  }
}
