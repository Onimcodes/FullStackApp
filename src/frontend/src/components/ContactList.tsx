import React, { useEffect, useState } from 'react';
import ContactItem from './ContactItem';
import ContactForm from './ContactForm';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
  onAdd: (contact: Contact) => void;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEdit, onDelete, onAdd }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddClick = () => {
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="contact-list flex flex-col space-y-2 p-4 bg-blue-100 rounded shadow-md">
      <button onClick={handleAddClick} className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Contact
      </button>
      {isFormVisible && (
        <ContactForm onSubmit={onAdd} onClose={handleFormClose} initialContact={undefined} />
      )}
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default React.memo(ContactList);