import React from 'react';
import type { Contact } from '../types/Contact';

// Ensure the import paths are correct and consistent with your project setup

interface ContactItemProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;

}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-lg font-medium">{contact.name}</p>
      <div className='bg-gray-200 p-2 rounded-full p-1'>
        <button onClick={() => onEdit(contact)} className="p-2 text-blue-500 hover:text-blue-700">
      </button>
      </div>
      <div className='bg-gray-200 rounded-full p-1'>
        <button onClick={() => onDelete(contact.id)} className="p-2 text-red-500 hover:text-red-700">
      </button>
    </div>
    </div>
  );
};

export default ContactItem;