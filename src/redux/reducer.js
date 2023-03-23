const initialState = {
  contacts: [],
  filter: {
    input: '',
  },
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'contacts/addContact':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };

    case 'contacts/deleteContact':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };

    case 'filter/setFilter':
      return {
        ...state,
        filter: { ...state.filter, input: action.payload },
      };

    case 'contacts/addTestData':
      return {
        ...state,
        contacts: [...state.contacts, ...action.payload],
      };

    default:
      return state;
  }
};
