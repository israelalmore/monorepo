import app from "./server";
const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});