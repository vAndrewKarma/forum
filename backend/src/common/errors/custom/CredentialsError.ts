import Template from '../template'

export default class CredentialsError extends Template {
  statusCode = 400

  constructor(public message) {
    super(message)
    Object.setPrototypeOf(this, CredentialsError.prototype)
  }
  serializer(): { message: string } {
    return { message: this.message }
  }
}
