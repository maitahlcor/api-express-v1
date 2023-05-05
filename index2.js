const express = require("express");
const app = express();
const morgan = require('morgan')
const port = 3001;
//1.1
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
//1.8
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body ')); 

//1.1
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

//1.2
app.get("/info", (req, res) => {
  const people = persons.length;
  const currentDate = new Date()
  "{str1}\n{$str2}\n{$str3}"
  res.send(`${"Phonebook has info for"} ${people} ${"people"}\n${"Time:"} ${currentDate}`);
});
//1.3
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (!person) return res.status(404).send('404 not found')
  return res.json(person)
});
//1.4
app.delete("/api/persons/:id", (req,res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});
//1.5
app.post("/api/persons", (req, res) => {
  const newContact = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: 'Leman Russ',
    number: '01-23-4567-89-VI',
  }
   //1.6
  const {name, number} = newContact;
  if (name === '' ) return res.status(406).send('error: name required')
  if ( number === '') return res.status(406).send('error: number required')
  if (persons.find((person) => person.name === name)) return res.status(409).send(`error:' ${name} 'name already registered`)  
  persons = [...persons, newContact];
  console.log(res.body);
  res.status(201).json(newContact);
});



app.listen(port, () => console.log(`app listening on port ${port}`));
