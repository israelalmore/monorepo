import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { NotesTable } from "../db/schema";
import { Response, Request, NextFunction } from "express";
import { CustomError } from "../lib/custom-error";
import { NoteSchema } from "../schemas/note.schema";

export async function addNote(req: Request, res: Response, next: NextFunction) {
  try {
    const parse = NoteSchema.safeParse(req.body);

    if (!parse.success || !parse.data) {
      const message = parse.error.message
      
      next(new CustomError(`Failed to add note: ${message}`, 500));
      return;
    }


    const noteDTO = parse.data;
    const note = await db.insert(NotesTable).values(noteDTO).returning();
    res.status(201).json({ note });
  } catch (error) {
    next(new CustomError("Failed to add note", 500));
  }
}

export async function getAllNotes(req: Request, res: Response, next: NextFunction) {
  try {
    const notes = await db.select().from(NotesTable);
    res.status(200).json({ notes });
  } catch (error) {
    next(new CustomError("Failed to fecth notes", 500));
  }
}

export async function getNote(req: Request, res: Response, next: NextFunction) {
  try {
    const note = await db
      .select()
      .from(NotesTable)
      .where(eq(NotesTable.id, +req.params.id));
    res.status(200).json({ note });
  } catch (error) {
    next(new CustomError("Failed to fetch note", 500));
  }
}

export async function deleteNote(req: Request, res: Response, next: NextFunction) {
  try {
    const note = await db
      .delete(NotesTable)
      .where(eq(NotesTable.id, +req.params.id))
      .returning({
        deletedNoteId: NotesTable.id,
      });
    res.status(200).json({ note });
  } catch (error) {
    next(new CustomError("Failed to delete note", 500));
  }
}

export async function updateNote(req: Request, res: Response, next: NextFunction) {
  try {
    const note = await db
      .update(NotesTable)
      .set(req.body)
      .where(eq(NotesTable.id, +req.params.id))
      .returning();

    res.status(201).json({ note });
  } catch (error) {
    next(new CustomError("Failed to update note", 500));
  }
}