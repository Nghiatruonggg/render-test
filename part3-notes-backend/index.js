const express = require("express");
const cors = require("cors");

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);

  if (!note) {
    res.status(404).json({ error: "Note does not exist" });
  }

  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  if (!newNote.content) {
    return res.status(400).json({
      error: "Content is missing",
    });
  }

  const maxId = notes.length;
  newNote.id = maxId + 1;
  newNote.important = newNote.important || false;
  notes.push(newNote);

  res.json(newNote);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
