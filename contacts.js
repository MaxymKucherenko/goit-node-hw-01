const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');
const contactsPath = path.resolve('./db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const idContact = contacts.find((item) => item.id === contactId);
  if (!idContact) {
    return null;
  }
  return idContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  /*  const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const removeContacts = contacts.splice(idx, 1); */
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
}

async function addContact(name, email, phone) {
  if (name && email && phone) {
    const contacts = await listContacts();
    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    const newContacts = [...contacts, newContact];
    console.log(newContacts);
    fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContacts;
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
