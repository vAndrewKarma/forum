import mongoose, { Document, Schema } from 'mongoose'

interface NoteDocument extends Document {
  title: string
  content: string
  privates: boolean
  username: string
}

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  username: { type: String, ref: 'User', required: true },
  privates: { type: Boolean, required: true },
})

const NoteModel = mongoose.model<NoteDocument>('Note', NoteSchema)

export { NoteDocument, NoteModel }
