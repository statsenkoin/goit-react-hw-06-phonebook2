import { useEffect, useState } from 'react';
import { localStorageService as storage } from 'services';
import { initialContacts } from 'dataBase';
import { Filter, ContactList, FormikForm } from 'components';
import {
  Layout,
  Title,
  Notification,
  ContactsTitle,
  ContactListBox,
} from './App.styled';

export function App() {
  const [contacts, setContacts] = useState(storage.load('contacts') ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => storage.save('contacts', contacts), [contacts]);

  const addContact = newContact => {
    const { name: newName } = newContact;
    let isContactExists = contacts.some(({ name }) => name === newName);
    if (isContactExists) {
      return alert(`${newName} is already in contacts!`);
    }
    setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = contactId =>
    setContacts(() => contacts.filter(contact => contact.id !== contactId));

  const onFilter = e => setFilter(() => e.target.value);

  const filterContactsByName = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const addTestData = () => {
    // storage.add('contacts', initialContacts);

    /**
     * initialContacts as test data may be added several times
     * It checks items and prevents adding if some of initialContacts
     * are in contacts
     */
    const newTestContactsList = initialContacts.filter(
      ({ id: newId }) =>
        !contacts
          .reduce((acc, { id: prevId }) => [...acc, prevId], [])
          .includes(newId)
    );
    setContacts(contacts => [...contacts, ...newTestContactsList]);
  };

  return (
    <Layout>
      <button type="button" onClick={addTestData}>
        Add test data
      </button>
      <Title>Phonebook</Title>
      <FormikForm onSubmit={addContact}></FormikForm>
      <ContactsTitle>Contacts</ContactsTitle>
      {contacts.length ? (
        <ContactListBox>
          <Filter value={filter} onChange={onFilter}></Filter>
          <ContactList
            contacts={filterContactsByName()}
            onClick={deleteContact}
          ></ContactList>
        </ContactListBox>
      ) : (
        <Notification>No any contacts in phonebook</Notification>
      )}
    </Layout>
  );
}
