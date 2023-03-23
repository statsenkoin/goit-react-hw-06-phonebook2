import { nanoid } from 'nanoid';

export const addContact = ({ name, number }) => {
  return {
    type: 'contacts/addContact',
    payload: {
      id: nanoid(),
      name,
      number,
    },
  };
};

export const deleteContact = contactId => {
  return {
    type: 'contacts/deleteContact',
    payload: contactId,
  };
};

export const setFilter = input => {
  return {
    type: 'filter/setFilter',
    payload: input,
  };
};

export const addTestData = testContacts => {
  return {
    type: 'contacts/addTestData',
    payload: testContacts,
  };
};
