
import { Router } from "express";
import { addNote, deleteNote, getAllNotes, getNote, updateNote} from "../handlers/notes";

const notesRouter = Router();

notesRouter.get("/get-note/:id", getNote);
notesRouter.get("/get-all-notes", getAllNotes);
notesRouter.post("/add-note", addNote);
notesRouter.put("/update-note/:id", updateNote);
notesRouter.delete("/delete-note/:id", deleteNote);

export default notesRouter;