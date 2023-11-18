export default abstract class Template extends Error {
  abstract statusCode: number

  constructor(message: string, public field?: string) {
    super(message)
    field = field
    Object.setPrototypeOf(this, Template.prototype)
  }
  abstract serializer(): { message: string; field?: string }
}
