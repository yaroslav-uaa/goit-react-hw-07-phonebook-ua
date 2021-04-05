import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
  updateContact,
} from '../../redux/contacts/contacts-operations';
import c from './Contacts.module.css';

const Contacts = ({
  contacts,
  deleteContact,
  isLoading,
  fetchContacts,
  updateContacts,
}) => {
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [unitName, setUnitName] = useState(null);
  const [unitNumber, setUnitNumber] = useState(null);

  const onEdit = ({ id, currentUnitName, currentUnitNumber }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setUnitName(currentUnitName);
    setUnitNumber(currentUnitNumber);
  };

  const updateData = ({ name, number, id }) => {
    updateContacts({ name, number, id });
  };

  const onSave = ({ name, number, id }) => {
    updateData({ name, number, id });
    onCancel();
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setUnitName(null);
    setUnitNumber(null);
  };

  return (
    <ul className="container">
      {isLoading && <h1>Загрузка</h1>}
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={c.link}>
          <p>
            {inEditMode.status && inEditMode.rowKey === id ? (
              <input
                className={c.editInput}
                value={unitName}
                onChange={event => setUnitName(event.target.value)}
                type="text"
                name="name"
                placeholder="Name"
                title="Ім'я може містити тільки букви, апострофи, тире і пробіли. Наприклад Буся, Буся Красотуся, Буся ля Красотуся і т.д."
                required
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              />
            ) : (
              name
            )}
          </p>
          <p>
            {inEditMode.status && inEditMode.rowKey === id ? (
              <input
                className={c.editInput}
                type="tel"
                value={unitNumber}
                name="number"
                onChange={event => setUnitNumber(event.target.value)}
                placeholder="Number"
                title="Номер телефона повинен складатися з 11-12 цифр і може містити цифри, пробіли, тире, пузаті скобки і може починатися з +"
                required
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
            ) : (
              number
            )}
          </p>
          <div className={c.btnContainer}>
            {inEditMode.status && inEditMode.rowKey === id ? (
              <React.Fragment>
                <button
                  className={'btn-success'}
                  onClick={() =>
                    onSave({
                      id: id,
                      name: unitName,
                      number: unitNumber,
                    })
                  }
                >
                  Save
                </button>

                <button
                  className={'btn-secondary'}
                  style={{ marginLeft: 18 }}
                  onClick={() => onCancel()}
                >
                  Cancel
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button
                  className={'btn-primary'}
                  onClick={() =>
                    onEdit({
                      id: id,
                      currentUnitName: name,
                      currentUnitNumber: number,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  style={{ marginLeft: 18 }}
                  className={'btn-primary'}
                  onClick={() => deleteContact(id)}
                >
                  Delete
                </button>
              </React.Fragment>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

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
  updateContacts: ({ name, number, id }) =>
    dispatch(updateContact({ name, number, id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
