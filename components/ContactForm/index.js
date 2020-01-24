import React from 'react';
import useForm from '@bit/iamtechnologies.iamtech-js.use-form';

const ContactForm = () => {
  const defaultValues = {
    name: '',
    email: '',
    matter: '',
    message: ''
  };

  const { values, useInput, isValid, errors, showErrors } = useForm(defaultValues);

  const ERRORS_TEXT = {
    isRequired: 'Campo obligatorio',
    isEmail: 'Formato de email inválido'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('values', values);
  };

  const formErrors = (
    <div className="form-errors">
      {showErrors.name && errors.name && errors.name.map(err => <div key={err} className="form-errors-item">{ERRORS_TEXT[err]}</div>)}
    </div>
  );

  return (
    <div className="contact-form-div">
      <form onSubmit={handleSubmit}>
        <input type="text" {...useInput('name', 'isRequired')} placeholder="Escriu el teu nom" />
        {formErrors}
        <input type="text" {...useInput('email', 'isEmail,isRequired')} placeholder="El teu email" />
        {formErrors}
        <input type="text" {...useInput('matter', 'isRequired')} placeholder="Asumpte" />
        {formErrors}
        <textarea className="message" {...useInput('message', 'isRequired')} placeholder="Escriu el teu missatge" />
        {formErrors}
        <div className="button-div">
          {isValid && (
            <button
              type="submit"
              className="button-yellow"
            >Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
