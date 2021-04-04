import axios from 'axios';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  editContactRequest,
  editContactSuccess,
  editContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from './contacts-actions';

axios.defaults.baseURL = 'http://localhost:3000';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());
  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error));
  }
  // axios
  //   .get('/contacts')
  //   .then(({ data }) => dispatch(fetchContactsSuccess(data)))
  //   .catch(error => dispatch(fetchContactsError(error)));
};

const addContact = ({ name, number }) => async dispatch => {
  dispatch(addContactRequest());
  const contact = { name, number };
  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }

  // axios
  //   .post('/contacts', contact)
  //   .then(({ data }) => dispatch(addContactSuccess(data)))
  //   .catch(error => dispatch(addContactError(error)));
};

const editContact = ({ id, complited }) => dispatch => {
  dispatch(editContactRequest());
  const update = { complited };

  axios
    .patch(`/contacts/${id}`, update)
    .then(({ data }) => dispatch(editContactSuccess(data)))
    .catch(error => dispatch(editContactError(error)));
};

const deleteContact = id => async dispatch => {
  dispatch(deleteContactRequest());
  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
  // axios
  //   .delete(`/contacts/${id}`)
  //   .then(() => dispatch(deleteContactSuccess(id)))
  //   .catch(error => dispatch(deleteContactError(error)));
};

export { addContact, deleteContact, fetchContacts, editContact };
