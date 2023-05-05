const table = require("@makeitrealcamp/db-mock");
const primarc1 = table.insert({ 
    name: "Leman Russ", 
    number: "VI" , 
    title:"Emeperor's Executioner"
});
const primarc2 = table.insert({     
    name: "Robute Guilliman", 
    number: "XIII", 
    title:"Avenging Son" 
});
const primarc3 = table.insert({ 
    name: "Rogal Dorn",
    number: "VII", 
    title:"Pretorian of Terra" 
});
const primarc4 = table.insert({ 
    name: "Lion El'Jhonson", 
    number: "I" , 
    title:"Primus Angelus Mortis"
});

function getAllContacts() {
  const records = table.findAll();
  return records;
}

function getContactsById(id) {
  const record = table.findById(id);
  return record;
}

function createContact(contact) {
  const record = table.insert(contact);
  return record;
}

function editContact(id, contact) {
  const contactEdit = {
    id,
    ...contact,
  };
  const record = table.update(contactEdit);
  return record;
}

function deleteContact(id) {
  const record = table.remove(id);
  return record;
}

function getLength() {
  const records = table.findAll();
  return records.length;
}

module.exports = {
  getAllContacts,
  getContactsById,
  createContact,
  editContact,
  deleteContact,
  getLength,
};