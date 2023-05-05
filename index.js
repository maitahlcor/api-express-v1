const express = require("express");
const morganBody = require("morgan-body");
const bodyParser = require("body-parser");

const {
  handleGetAllContacts,
  handleGetByIdContact,
  handleCreateContact,
  handleEditContact,
  handleDeleteContact,
  getLength,
} = require("./controller");

const app = express();
const port = 8080;
const date = Date();

app.use(express.json());
app.use(bodyParser.json());
morganBody(app);

app.get("/api/contacts", handleGetAllContacts);

app.get("/info", (req, res) =>
  res.send(`${"Phonebook has info for"} ${getLength()} ${"people"}\n${"Time:"} ${new Date()}`  )//`${"Phonebook has info for"} ${getLength()} ${"people"}\n${"Time:"} ${currentDate}` 
);

app.get("/api/contacts/:id", handleGetByIdContact);

app.post("/api/contacts", handleCreateContact);

app.patch("/api/contacts/:id", handleEditContact);

app.delete("/api/contacts/:id", handleDeleteContact);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}!`)
);