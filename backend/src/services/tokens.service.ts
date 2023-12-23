import { randomBytes } from 'crypto'
import { redServ } from './redis.service'

type TtokenServ = {
  genTokenForNewLocation: (uid: string) => Promise<string>
}
export const tokenServ: TtokenServ = {
  genTokenForNewLocation: undefined,
}

tokenServ.genTokenForNewLocation = async (uid: string) => {
  const string = randomBytes(20).toString('hex')

  await redServ.redSetEx(`new_location: ${string}`, 86400, uid.toString())

  return string
}
