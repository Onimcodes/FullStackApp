import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ContactItem = ({ contact, onEdit, onDelete }) => {
    return (_jsxs("li", { className: "mb-2", children: [_jsx("strong", { children: "Name:" }), " ", contact.name, ", ", _jsx("strong", { children: "Email:" }), " ", contact.email, ", ", _jsx("strong", { children: "Phone:" }), " ", contact.phoneNumber, _jsx("button", { onClick: () => onEdit(contact), className: "ml-2 text-blue-500", children: "Edit" }), _jsx("button", { onClick: () => onDelete(contact.id), className: "ml-2 text-red-500", children: "Delete" })] }));
};
export default ContactItem;
