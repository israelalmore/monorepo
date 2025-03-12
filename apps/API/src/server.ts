import express, { urlencoded, json } from "express";
import { notFound } from "./middleware/not-found";
import { error } from "./middleware/error";
import notesRouter from "./routes/notes";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", notesRouter);

app.use(notFound);
app.use(error);

export default app;