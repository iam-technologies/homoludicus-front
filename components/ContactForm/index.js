import React, { useRef } from 'react';
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
    // console.log('values', values);
  };

  const formErrors = (
    <div className="form-errors">
      {showErrors.name && errors.name && errors.name.map(err => <div key={err} className="form-errors-item">{ERRORS_TEXT[err]}</div>)}
    </div>
  );

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const issueRef = useRef(null);
  const messageRef = useRef(null);

  const handleKeyPress = (event, ref) => {
    if (event.key === 'Enter') {
      if (ref === nameRef) {
        emailRef.current.focus();
      } else if (ref === emailRef) {
        issueRef.current.focus();
      } else if (ref === issueRef) {
        messageRef.current.focus();
      }
    }
  };

  return (
    <div className="contact-form-div">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          {...useInput('name', 'isRequired')}
          placeholder="Escriu el teu nom"
          onKeyDown={e => handleKeyPress(e, nameRef)}
          ref={nameRef}
        />
        {formErrors}
        <input
          type="text"
          {...useInput('email', 'isEmail,isRequired')}
          placeholder="El teu email"
          onKeyDown={e => handleKeyPress(e, emailRef)}
          ref={emailRef}
        />
        {formErrors}
        <input
          type="text"
          {...useInput('matter', 'isRequired')}
          placeholder="Asumpte"
          onKeyDown={e => handleKeyPress(e, issueRef)}
          ref={issueRef}
        />
        {formErrors}
        <textarea
          className="message"
          {...useInput('message', 'isRequired')}
          placeholder="Escriu el teu missatge"
          ref={messageRef}
        />
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
