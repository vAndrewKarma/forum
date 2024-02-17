import { Request, Response, NextFunction } from 'express'
import NoteMethods from '../services/notes.service'
import { NoteModel } from '../models/notes'
import { NotesType, validateNotes } from '../common/utils/validation'
import sanitize from '../common/utils/mongo-sanitize'
import escapeHtml from '../common/utils/html-escape'

type NoteRoutesType = {
  CreateNotes: (req: Request, res: Response, next: NextFunction) => void
  EditNotes: (req: Request, res: Response, next: NextFunction) => void
}
const NotesController: NoteRoutesType = {
  EditNotes: undefined,
  CreateNotes: undefined,
}

NotesController.CreateNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const noteData: NotesType = sanitize(
      JSON.parse(JSON.stringify(validateNotes(req.body)))
    )

    const username = sanitize(req.session.passport.user.username)
    const note = NoteMethods.createNote({
      username,
      title: escapeHtml(noteData.title),
      privates: !!noteData.privates,
      content: escapeHtml(noteData.content),
    })

    await NoteMethods.saveNote(note)
    return res.send(await NoteModel.find({}))
  } catch (err) {
    return next(err)
  }
}
export default NotesController
