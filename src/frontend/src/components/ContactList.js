import { jsx as _jsx } from "react/jsx-runtime";
import ContactItem from './ContactItem';
const ContactList = ({ contacts, onEdit, onDelete }) => {
    return (_jsx("ul", { className: "list-disc pl-5", children: contacts.map((contact) => (_jsx(ContactItem, { contact: contact, onEdit: onEdit, onDelete: onDelete }, contact.id))) }));
};
export default ContactList;
