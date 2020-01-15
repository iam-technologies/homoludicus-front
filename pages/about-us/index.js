import React from 'react';
import useForm from '@bit/iamtechnologies.iamtech-js.use-form';
import Layout from '../../components/Layout';

const aboutUs = () => {
  const team = ['Corey Hale', 'Evan Boyd', 'Randy Frazier'];

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

  return (
    <Layout>
      <section className="about-us-sec">
        <div className="about-text-wrapper">
          <h1>Homoludicus Granollers</h1>
          <div className="about-text">
            <p>
              While it was just a TV show, that little speech at the beginning of the original Star Trek
              show really did do a good job of capturing our feelings about space. It is those feelings that drive our love
              of astronomy and our desire to learn more and more about it.
              <br />
              <br />
              The thing that is most exciting about studying the universe is
              also the most frustrating and that is that no matter how expert we get, we are always just getting started. But if it’s any
              consolation, some of the most advanced minds in science and from history always felt that way about space. Even the greats
              such as Copernicus and Einstein looked up into space and felt like they were just a spec in the presence of such infinity.
            </p>
          </div>
        </div>
      </section>
      <section className="contact-us-sec">
        <div className="contact-wrapper">
          <div className="team-column">
            <h4>Equip</h4>
            {team.map((guy) => {
              return <p key={guy}>{guy}</p>;
            })}
          </div>
          <div className="contact-column">
            <h4>Contacta'ns</h4>
            <form onSubmit={handleSubmit}>
              <input type="text" {...useInput('name', 'isRequired')} placeholder="Escriu el teu nom" />
              <div className="form-errors">
                {showErrors.name && errors.name && errors.name.map(err => <div key={err} className="form-errors-item">{ERRORS_TEXT[err]}</div>)}
              </div>
              <input type="text" {...useInput('email', 'isEmail,isRequired')} placeholder="El teu email" />
              <div className="form-errors">
                {showErrors.email && errors.email && errors.email.map(err => <div key={err} className="form-errors-item">{ERRORS_TEXT[err]}</div>)}
              </div>
              <input type="text" {...useInput('matter', 'isRequired')} placeholder="Asumpte" />
              <div className="form-errors">
                {showErrors.matter && errors.matter && errors.matter.map(err => <div key={err} className="form-errors-item">{ERRORS_TEXT[err]}</div>)}
              </div>
              <input type="text" className="message" {...useInput('message', 'isRequired')} placeholder="Escriu el teu missatge" />
              <div className="form-errors">
                {showErrors.message && errors.message && errors.message.map(err => <div key={err} className="form-errors-item">{ERRORS_TEXT[err]}</div>)}
              </div>
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
        </div>
      </section>
    </Layout>
  );
};

export default aboutUs;
