import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
  editContact,
} from '../../redux/contacts/contacts-operations';
import c from './Contacts.module.css';

class Contacts extends Component {
  state = {
    name: '',
    number: '',
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  handleNameChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { contacts, deleteContact } = this.props;
    return (
      <ul>
        {this.props.isLoading && <h1>Загрузка</h1>}
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={c.links}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={this.handleNameChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Ім'я може містити тільки букви, апострофи, тире і пробіли. Наприклад Буся, Буся Красотуся, Буся ля Красотуся і т.д."
              required
            />

            <input
              type="tel"
              name="number"
              value={number}
              placeholder="Enter your number"
              onChange={this.handleNameChange}
              pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
              title="Номер телефона повинен складатися з 11-12 цифр і може містити цифри, пробіли, тире, пузаті скобки і може починатися з +"
              required
            />

            <button type="button" onClick={() => editContact(id)}>
              Edit
            </button>
            <button type="button" onClick={() => deleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

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

const mapStateToProps = ({ contacts: { items, filter, loading } }) => ({
  contacts: getFilteredContact(items, filter),
  isLoading: loading,
});

const mapDispatchToProps = dispatch => ({
  deleteContact: id => dispatch(deleteContact(id)),
  fetchContacts: () => dispatch(fetchContacts()),
  editContacts: id => dispatch(editContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
