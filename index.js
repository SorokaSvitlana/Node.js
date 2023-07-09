import contactService from './contacts.js'
import {program} from "commander";

const invokeAction = async ({action, id, name, email, phone})=> {
    switch(action){
        case "list":
            const allContact = await contactService.listContacts();
            return console.table(allContact);
        case "get":
            const contactById = await contactService.getContactById(id);
            return console.log(contactById);
        case "add":
            const newContact = await contactService.addContact({name, email, phone});
            return console.log(newContact);
        case "remove":
            const removeContact = await contactService.removeContact(id);
            return console.log(removeContact);
        default:
            console.log("Unknown action");
    }
}

program
.option('-a, --action <type>', 'choose action')
.option('-i, --id <type>', 'user id')
.option('-n, --name <type>', 'user name')
.option('-e, --email <type>', 'user email')
.option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();
invokeAction(options);
