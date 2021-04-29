import { ObjectID } from 'mongodb'
import { ANY } from 'sandhands'
// The Sandhands format for an Object ID
export default { _: ANY, validate: data => (ObjectID.isValid(data) ? true : 'Invalid ID Provided') }
