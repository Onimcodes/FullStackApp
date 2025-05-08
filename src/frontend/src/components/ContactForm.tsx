import React, { useState, useEffect, useContext } from 'react';
import type { Contact } from '../types/Contact';
import MyContext from '../MyContext.tsx';
import '../index.css'; // Import the CSS file


interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
  onClose: () => void;
  initialContact?: Contact;
  onAdd?: (contact: Contact) => void; // Optional onAdd prop
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { onSubmit, onClose, onAdd, initialContact = {} as Contact } = props;
  
  // console.log('ContactForm received initialContact:', initialContact);
  useEffect(() => {
    console.log('Initial contact changed in ContactForm useEffect:', initialContact);
  }, [initialContact]);
   
  const [contact, setContact] = useState<Contact>(initialContact ?? {
    id: 0,
    name: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (initialContact) {
      setContact(initialContact);
    }
  }, [initialContact]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (field: string, value: string | undefined): string | null => {
    if (!value || !value.trim()) {
      return `${field} is required`;
    }
    return null;
  };
  
  const validateContact = (contact: { name: string; email: string; phoneNumber: string }): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
  
    const trimmedName = contact.name?.trim();
    const trimmedEmail = contact.email?.trim();
    const trimmedPhoneNumber = contact.phoneNumber?.trim();
  
    if (trimmedName === undefined) {
      errors['name'] = 'Name is required';
    } else if (!trimmedName) {
      errors['name'] = 'Name is required';
    }
  
    if (trimmedEmail === undefined) {
      errors['email'] = 'Email is required';
    } else if (!trimmedEmail) {
      errors['email'] = 'Email is required';
    }
  
    if (trimmedPhoneNumber === undefined) {
      errors['phoneNumber'] = 'Phone Number is required';
    } else if (!trimmedPhoneNumber) {
      errors['phoneNumber'] = 'Phone Number is required';
    }
  
    return errors;
  };
  
  const validate = () => {
    const newErrors = validateContact(contact);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    console.log('Submitting contact:', contact);
    onSubmit(contact);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
      
      {/* Name */}
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={contact.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors['name'] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors['name'] && <p className="mt-1 text-xs text-red-500">{errors['name']}</p>}
      </div>
      
      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors['email'] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors['email'] && <p className="mt-1 text-xs text-red-500">{errors['email']}</p>}
      </div>
      
      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={contact.phoneNumber}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors['phoneNumber'] ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors['phoneNumber'] && <p className="mt-1 text-xs text-red-500">{errors['phoneNumber']}</p>}
      </div>
      
      <button
        type="submit"
        className="w-full py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
