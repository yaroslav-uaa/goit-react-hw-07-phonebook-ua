import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  filterContacts,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  editContactRequest,
  editContactSuccess,
  editContactError,
} from './contacts-actions';

const items = createReducer([], {
  [fetchContactsSuccess]: (state, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [editContactSuccess]: (state, { payload }) =>
    state.map(contact => (contact.id === payload ? payload : contact)),
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [filterContacts]: (state, { payload }) => payload,
});

const loading = createReducer(false, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
  [editContactRequest]: () => true,
  [editContactSuccess]: () => false,
  [editContactError]: () => false,
});

export default combineReducers({
  items,
  filter,
  loading,
});
