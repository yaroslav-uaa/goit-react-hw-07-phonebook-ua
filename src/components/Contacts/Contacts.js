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

  const updateData = ({ id, newUnitNumber, newUnitName }) => {
    updateContacts({ id, newUnitNumber, newUnitName });
  };

  const onSave = ({ id, newUnitNumber, newUnitName }) => {
    updateData({ id, newUnitNumber, newUnitName });
    onCancel();
    fetchContacts();
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
    <div className="container">
      {isLoading && <h1>Загрузка</h1>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ id, name, number }) => (
            <tr key={id}>
              <td>
                {inEditMode.status && inEditMode.rowKey === id ? (
                  <input
                    value={unitName}
                    onChange={event => setUnitName(event.target.value)}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    title="Ім'я може містити тільки букви, апострофи, тире і пробіли. Наприклад Буся, Буся Красотуся, Буся ля Красотуся і т.д."
                    required
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  />
                ) : (
                  name
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === id ? (
                  <input
                    type="tel"
                    value={unitNumber}
                    name="number"
                    onChange={event => setUnitNumber(event.target.value)}
                    placeholder="Enter your number"
                    title="Номер телефона повинен складатися з 11-12 цифр і може містити цифри, пробіли, тире, пузаті скобки і може починатися з +"
                    required
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  />
                ) : (
                  number
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === id ? (
                  <React.Fragment>
                    <button
                      className={'btn-success'}
                      onClick={() =>
                        onSave({
                          id: id,
                          newUnitName: unitName,
                          newUnitNumber: unitNumber,
                        })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={'btn-secondary'}
                      style={{ marginLeft: 8 }}
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
                      className={'btn-primary'}
                      onClick={() => deleteContact(id)}
                    >
                      Delete
                    </button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
  updateContacts: ({ id, name, number }) =>
    dispatch(updateContact({ id, name, number })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
