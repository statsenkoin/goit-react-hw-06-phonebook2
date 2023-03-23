const contactsInitialState = [];

const contactsReducer = (state = contactsInitialState, action) => {
  switch (action.type) {
    case 'contacts/addContact':
      return [...state, action.payload];

    case 'contacts/deleteContact':
      return state.filter(contact => contact.id !== action.payload);

    case 'contacts/addTestData':
      return [...state, ...action.payload];

    default:
      return state;
  }
};

const filterInitialState = '';

const filterReducer = (state = filterInitialState, action) => {
  switch (action.type) {
    case 'filter/setFilter':
      return action.payload;

    default:
      return state;
  }
};

export const rootReducer = (state = {}, action) => {
  return {
    contacts: contactsReducer(state.contacts, action),
    filter: filterReducer(state.filter, action),
  };
};
