import { randomBytes } from "crypto"
import redclient from "../lib/redclient"

export const genTokenForNewLocation = async(uid: string)=>{
    const string =  randomBytes(20).toString('hex')


  redclient.set(`new_location: ${uid}`,string,'EX',86400,(err,reply)=>{
    if (err) {
        console.error('Error setting key:', err);
      } else {
        console.log('Key set successfully:', reply);
      }
    
  })
  return string 
}