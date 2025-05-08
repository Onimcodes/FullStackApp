import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const ContactForm = ({ onSubmit, initialContact }) => {
    const [contact, setContact] = useState({
        id: initialContact?.id || 0, // Provide a default value for id
        name: initialContact?.name || '',
        email: initialContact?.email || '',
        phoneNumber: initialContact?.phoneNumber || ''
    });
    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contact);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "p-4 border rounded", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "name", className: "block mb-2 text-sm font-medium text-gray-900", children: "Name" }), _jsx("input", { type: "text", id: "name", name: "name", value: contact.name, onChange: handleChange, required: true, className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block mb-2 text-sm font-medium text-gray-900", children: "Email" }), _jsx("input", { type: "email", id: "email", name: "email", value: contact.email, onChange: handleChange, required: true, className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "phoneNumber", className: "block mb-2 text-sm font-medium text-gray-900", children: "Phone Number" }), _jsx("input", { type: "text", id: "phoneNumber", name: "phoneNumber", value: contact.phoneNumber, onChange: handleChange, required: true, className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" })] }), _jsx("button", { type: "submit", className: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center", children: "Submit" })] }));
};
export default ContactForm;
