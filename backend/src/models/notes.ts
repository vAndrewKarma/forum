import mongoose, { Document, Schema } from 'mongoose'
import { UserDocument } from './user'
interface NoteDocument extends Document {
  title: string
  content: string
  user: UserDocument['_id']
}

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const NoteModel = mongoose.model<NoteDocument>('Note', NoteSchema)

export { NoteDocument, NoteModel }
