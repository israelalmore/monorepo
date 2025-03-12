import { z } from "zod";

export const NoteSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    body: z.string()
})

export type TNote = z.infer<typeof NoteSchema>