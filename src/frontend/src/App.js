import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useState } from 'react';
import SearchBar from './components/SearchBar';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
const App = () => {
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(undefined);
    const handleSearch = useCallback((query) => {
        try {
            // Simulate fetching filtered contacts from an API or state
            const contacts = [
                { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '098-765-4321' },
                // Add more contacts as needed
            ];
            const filtered = contacts.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase()) ||
                contact.email.toLowerCase().includes(query.toLowerCase()) ||
                contact.phoneNumber.includes(query));
            setFilteredContacts(filtered);
        }
        catch (error) {
            console.error('Error during search:', error);
        }
    }, []);
    const handleSubmit = useCallback((contact) => {
        try {
            // Simulate adding or updating a contact
            if (selectedContact) {
                // Update existing contact
                const updatedContacts = filteredContacts.map((c) => c.id === selectedContact.id ? contact : c);
                setFilteredContacts(updatedContacts);
            }
            else {
                // Add new contact
                setFilteredContacts([...filteredContacts, contact]);
            }
            setSelectedContact(undefined);
        }
        catch (error) {
            console.error('Error during submission:', error);
        }
    }, [selectedContact, filteredContacts]);
    const handleEdit = useCallback((contact) => {
        try {
            setSelectedContact(contact);
        }
        catch (error) {
            console.error('Error during edit:', error);
        }
    }, []);
    const deleteContact = useCallback((contactId) => {
        try {
            const updatedContacts = filteredContacts.filter((contact) => contact.id !== contactId);
            setFilteredContacts(updatedContacts);
        }
        catch (error) {
            console.error('Error during deletion:', error);
        }
    }, [filteredContacts]);
    return (_jsxs("div", { className: "app-container", children: [_jsx("header", { className: "app-header", children: _jsx("h1", { children: "Contact Manager" }) }), _jsxs("main", { className: "app-main", children: [_jsx(SearchBar, { onSearch: handleSearch }), _jsx(ContactForm, { onSubmit: handleSubmit, initialContact: selectedContact }), _jsx(ContactList, { contacts: filteredContacts, onEdit: handleEdit, onDelete: deleteContact })] })] }));
};
export default React.memo(App);
