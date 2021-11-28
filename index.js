const contactsOperations = require('./contacts');
const argv = require('yargs').argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;
    case 'get':
      const idContact = await contactsOperations.getContactById(id);
      if (!idContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(idContact);
      break;
    case 'add':
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;
    case 'remove':
      const newContacts = await contactsOperations.removeContact(id);
      console.log(newContacts);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
