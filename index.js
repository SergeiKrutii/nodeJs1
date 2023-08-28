const path = require("path");
const contacts = require("./constacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log("🚀 ~ allContacts:", allContacts);
      return allContacts;

    case "get":
      const contactById = await contacts.getContactById(id);
      console.log("🚀 ~ contactById:", contactById);
      return contactById;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log("🚀 ~ newContact:", newContact);
      return newContact;

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      console.log("🚀 ~ deletedContact:", deletedContact);
      return deletedContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
/////////////////////////////////////////////////////////////
const allContacts = async () => {
  const allContacts = await contacts.listContacts();
  console.log("allContacts", allContacts);
  return allContacts;
};
const contactById = async (id) => {
  const contact = await contacts.getContactById(id);
  console.log("🚀 ~ contact:", contact);
  return contact;
};
const deleteContact = async (id) => {
  const deletedContact = await contacts.removeContact(id);
  console.log("🚀 ~ deletedContact:", deletedContact);
  return deletedContact;
};
const addNewContact = async (name, email, phone) => {
  const newContact = await contacts.addContact(name, email, phone);
  console.log("🚀 ~ newContact:", newContact);
  return newContact;
};

// allContacts();
// contactById("drsAJ4SHPYqZeG-83QTVW");
// deleteContact("AeHIrLTr6JkxGE6SN-0Rw");
// addNewContact("Ницше", "nictshe@gmail.com", "+49539412394");
