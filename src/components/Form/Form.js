import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addContact } from '../../redux/contacts/contacts-actions';
import f from './Form.module.css';
import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    const { onSubmit, contacts } = this.props;
    e.preventDefault();
    const originContact = contacts.find(item => item.name === this.state.name);
    return originContact
      ? alert(`${this.state.name} is already used`)
      : onSubmit({ ...this.state });
  };

  handleNameChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={f.form} onSubmit={this.handleSubmit}>
        <label className={f.label}>
          Name
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
        </label>
        <label className={f.label}>
          Number
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
        </label>
        <button type="submit" className={f.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: item => dispatch(addContact(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
