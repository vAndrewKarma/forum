import { randomBytes } from 'crypto'
import redclient from '../lib/redclient'

const genTokenForNewLocation = async (uid: string) => {
  const string = randomBytes(20).toString('hex')

  const client = await redclient
  client.setEx(`new_location: ${uid}`, 86400, string)
  return string
}

export default genTokenForNewLocation
