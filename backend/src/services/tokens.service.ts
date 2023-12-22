import { randomBytes } from 'crypto'
import { redServ } from './redis.service'
const genTokenForNewLocation = async (uid: string) => {
  const string = randomBytes(20).toString('hex')

  await redServ.redSetEx(`new_location: ${string}`, 86400, uid.toString())

  return string
}

export default genTokenForNewLocation
