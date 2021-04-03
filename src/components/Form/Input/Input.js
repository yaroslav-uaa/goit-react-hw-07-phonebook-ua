import React from 'react';
import f from '../Form.module.css';

const Input = ({
  label,
  name,
  type,
  title,
  placeholder,
  pattern,
  handleNameChange,
}) => {
  return (
    <>
      <label className={f.label}>
        {label}
        <input
          type={type}
          value={name}
          placeholder={placeholder}
          onChange={handleNameChange}
          pattern={pattern}
          title={title}
          required
        />
      </label>
    </>
  );
};
export default Input;

// "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
// "Ім'я може містити тільки букви, апострофи, тире і пробіли. Наприклад Буся, Буся Красотуся, Буся ля Красотуся і т.д."

//    Number

//      type="tel"
//      name="number"
//      value={number}
//      placeholder="Enter your number"
//      onChange={this.handleNameChange}
//      pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
//      title="Номер телефона повинен складатися з 11-12 цифр і може містити цифри, пробіли, тире, пузаті скобки і може починатися з +"
//  </label>;
