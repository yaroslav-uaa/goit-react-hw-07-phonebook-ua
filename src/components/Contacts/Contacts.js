import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import c from './Contacts.module.css';

const Contacts = ({ contacts, deleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={c.links}>
        <p>{name}</p>
        <p>{number}</p>
        <button type="button" onClick={() => {}}>
          Edit
        </button>
        <button type="button" onClick={() => deleteContact(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func,
};

const getFilteredContact = (allContacts, filter) => {
  return filter
    ? allContacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLowerCase()),
      )
    : allContacts;
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getFilteredContact(items, filter),
});

const mapDispatchToProps = dispatch => ({
  deleteContact: id => dispatch(deleteContact(id)),
  // editContact: id => dispatch(editContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
