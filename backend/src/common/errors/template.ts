
export default abstract class Template extends Error {
  abstract statusCode: number
  public logout: boolean;
  constructor(
    message: string,
    public field?: string
  ) {
    super(message)
    Object.setPrototypeOf(this, Template.prototype)
  }
  handler?(): void {
    // Default implementation does nothing
  } 
  abstract serializer(): { message: string; field?: string }
}
