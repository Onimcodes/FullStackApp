import React, { useEffect, useState, useCallback } from 'react';
import type { Contact } from '../src/types/Contact';
import SearchBar from './components/SearchBar';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import axios from 'axios';
import MyContext from './MyContext.js';

const API_BASE_URL = 'http://localhost:5116/api';

interface AppProps {
  // Define any props if needed
}

const App: React.FC<AppProps> = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  if (typeof isDataLoading !== 'boolean' || typeof isFormVisible !== 'boolean') {
    throw new Error('Initial state must be a boolean');
  }
  console.log("this is the selected data for edit", selectedContact)
  const logSelectedContact = (contact: Contact | null) => {
    if (contact) {
      console.log('App passing to ContactForm:', contact);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get<Contact[]>(`${API_BASE_URL}/Contacts`);
        setContacts(response.data);
        setFilteredContacts(response.data);
        setIsDataLoading(false);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
        setIsDataLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = useCallback((query: string) => {
    try {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase()) ||
        contact.phoneNumber.includes(query)
      );

      setFilteredContacts(filtered);
    } catch (error) {
      console.error('Error during search:', error);
    }
  }, [contacts]);

  const handleSubmit = useCallback((contact: Contact) => {
    try {
      if (selectedContact) {
        console.log('Updating contact:', contact);
        const updatedContacts = contacts.map((c) =>
          c.id === selectedContact.id ? contact : c
        );
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);

        axios.put(`${API_BASE_URL}/Contacts/${contact.id}`, contact)
          .then(() => {
            setSelectedContact(undefined);

          })
          .catch((error) => {
            console.error('Error updating contact:', error);
          });
      } else {
        axios.post(`${API_BASE_URL}/Contacts`, contact)
          .then((response) => {
            setContacts([...contacts, response.data]);
            setFilteredContacts([...filteredContacts, response.data]);
          })
          .catch((error) => {
            console.error('Error adding contact:', error);
          });
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  }, [selectedContact, contacts, filteredContacts]);

  const handleEdit = useCallback((contact: Contact) => {
    try {
      setSelectedContact(contact);
      logSelectedContact(contact);
    } catch (error) {
      console.error('Error during edit:', error);
    }
  }, [setSelectedContact]);

  const handleOpenContactForm = (contact?: Contact) => {
    setIsFormVisible(true);
    if (contact) {
      const newContact = { ...contact };
      // logSelectedContact(newContact);
   
      setSelectedContact(newContact);
      console.log('contact selected successfully:', newContact);

      setIsFormVisible(true);
    }
    else {
      resetSelectedContact();
      setIsFormVisible(true);
    }
  };

  const deleteContact = useCallback((contactId: number) => {
    try {
      const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);

      axios.delete(`${API_BASE_URL}/Contacts/${contactId}`)
        .catch((error) => {
          console.error('Error deleting contact:', error);
        });
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  }, [contacts]);

  const resetSelectedContact = () => {
    setSelectedContact(undefined);
    setIsFormVisible(false);
  };

  if (isFormVisible) {
    console.log('Form visible:', isFormVisible);
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-10">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn">
    
    {/* Header */}
    <header className="text-center">
      <h1 className="text-3xl font-extrabold text-blue-700">Contact Manager</h1>
      <p className="text-sm text-gray-500 mt-1">Manage your contacts easily</p>
    </header>

    {/* Main content */}
    <main className="space-y-4">
     <div>
       <SearchBar onSearch={handleSearch} />
       <div>
          <button
            onClick={() => handleOpenContactForm()}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
          >
            Add Contact
          </button>
       </div>
     </div>

      {/* Form */}
      {isFormVisible && (
        <>
          {console.log("Rendering ContactForm with:", selectedContact)}
          <ContactForm
            onSubmit={handleSubmit}
            onClose={resetSelectedContact}
            initialContact={selectedContact}
          />
        </>
      )}

      {/* Contact List or Loading */}
      {isDataLoading ? (
        <div className="text-center py-4 text-blue-600 font-medium animate-pulse">
          Loading...
        </div>
      ) : (
        <ContactList
          contacts={filteredContacts}
          onEdit={handleOpenContactForm}
          onDelete={deleteContact}
          onAdd={handleSubmit}
        />
      )}
    </main>
  </div>
</div>
  );
};

export default React.memo(App);
