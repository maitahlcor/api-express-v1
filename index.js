const express = require("express");
const app = express();
const morgan = require('morgan')
const port = 3001;

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-123456",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-23-4567-89",
  },
  {
    id: "4",
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body ')); 


app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const people = persons.length;
  const currentDate = new Date()
  res.send(`Phonebook has info for ${people} people<br><br>Time: ${currentDate}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (!person) return res.status(404).send('404 Person not found')
  return res.json(person)
});

app.delete("/api/persons/:id", (req,res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const newContact = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: 'Leman Russ',
    number: '01-23-4567-89-VI',
  }
   
  const {name, number} = newContact;
  if (name === '' || number === '') return res.status(406).send('error: number and name required')
  if (persons.find((person) => person.name === name)) return res.status(409).send('error: name already registered')  
  persons = [...persons, newContact];
  console.log(res.body);
  res.status(201).json(newContact);
});



app.listen(port, () => console.log(`Example app listening on port ${port}`));