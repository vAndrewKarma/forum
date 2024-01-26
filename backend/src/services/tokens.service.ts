import { randomBytes } from 'crypto'
import { redServ } from './redis.service'

type TtokenServ = {
  genTokenForNewLocation: (uid: string) => Promise<string>
  genTokenForResetPassword: (uid: string) => Promise<string>
}
export const tokenServ: TtokenServ = {
  genTokenForNewLocation: undefined,
  genTokenForResetPassword: undefined,
}

const RANDOM_BYTE_SIZE = 20
const ONE_DAY = 86400

tokenServ.genTokenForNewLocation = async (uid: string) => {
  const string = randomBytes(RANDOM_BYTE_SIZE).toString('hex')

  await redServ.redSetEx(`new_location: ${string}`, ONE_DAY, uid.toString())

  return string
}

tokenServ.genTokenForResetPassword = async (uid: string) => {
  const string = randomBytes(RANDOM_BYTE_SIZE).toString('hex')

  await redServ.redSetEx(`reset_password: ${string}`, ONE_DAY, uid.toString())
  return string
}
