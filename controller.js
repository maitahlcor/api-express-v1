const {
    getAllContacts,
    getContactsById,
    createContact,
    editContact,
    deleteContact,
    getLength,
  } = require("./db");
  
  function handleGetAllContacts(req, res) {
    const records = getAllContacts();
    res.status(200).json(records);
  }
  
  function handleGetByIdContact(req, res) {
    const { id } = req.params;
    const record = getContactsById(id);
    if (Object.keys(record).length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json(record);
  }
  
  function handleCreateContact(req, res) {
    const contact = req.body;
    const { name, number } = contact;
    const record = createContact(contact);
    if (!number) {
      return res.status(400).json({ message: "Number is empty" });
    }else if (name === contact.name) {
      return res.status(400).json({ message: "Contact already exist" });
    }else{
    return res.status(201).json(record);
    }
  }
  
  function handleEditContact(req, res) {
    const { id } = req.params;
    const contact = req.body;
    const record = editContact(id, contact);
    if (Object.keys(record).length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(202).json(record);
  }
  
  function handleDeleteContact(req, res) {
    const { id } = req.params;
    deleteContact(id);
    return res.status(204).json({ message: "Contact Deleted" });
  }
  
  module.exports = {
    handleGetAllContacts,
    handleGetByIdContact,
    handleCreateContact,
    handleEditContact,
    handleDeleteContact,
    getLength,
  };