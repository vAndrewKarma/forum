import { NoteDocument, NoteModel } from '../models/notes'

type NotesType = {
  createNote: ({
    username,
    title,
    content,
    privates,
  }: {
    username: string
    privates: boolean
    title: string
    content: string
  }) => NoteDocument
  saveNote: (note: NoteDocument) => Promise<void>
}

const NoteMethods: NotesType = {
  createNote: undefined,
  saveNote: undefined,
}

NoteMethods.createNote = ({
  username,
  title,
  content,
  privates,
}: {
  username: string
  privates: boolean
  title: string
  content: string
}) => {
  return new NoteModel({ username, title, content, privates })
}
NoteMethods.saveNote = async (note: NoteDocument) => {
  await note.save()
}

export default NoteMethods
