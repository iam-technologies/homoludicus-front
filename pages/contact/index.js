import React from 'react';
import Layout from '../../components/Layout';
import ContactForm from '../../components/ContactForm';
import SectionHeader from '../../components/SectionHeader';

const ContactPage = () => {
  const title = 'No dubtis en contactar-nos';
  const text = (
    <p>
      Si tens algun dubte, proposta o simplement vols conèixer més sobre nosaltres…
      <br />
      no dubtis en contactactar-nos, estarem encantats de saber de tu.
    </p>
  );

  const dir = 'Carrer de Sant Jaume, 73, 08400 Granollers-Barcelona';
  const tel = '930 13 86 10';

  return (
    <Layout>
      <SectionHeader title={title} text={text} />
      <div className="contact-page">
        <section className="contact-left-sec">
          <ContactForm />
        </section>
        <section className="contact-right-sec">
          <div className="contact-info">
            <div className="contact-column">
              <div className="address-div">
                <p className="p-big-title">Ubicació:</p>
                <p className="info-data">{dir}</p>
              </div>
              <div className="tel-div">
                <p className="p-big-title">Telèfon de contacte</p>
                <p className="info-data">{tel}</p>
              </div>
            </div>
            <div className="hours-column">
              <p className="p-big-title">Horaris de botiga:</p>
              <p className="p-title">Dilluns a Divendres</p>
              <p className="info-data">00:00h a 00:00h</p>
              <p className="p-title">Dissabte</p>
              <p className="info-data">00:00h a 00:00h</p>
            </div>
          </div>
          <div className="map-div">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11972.602083678357!2d2.1566913!3d41.3925374!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2da61917333a5b7e!2sHomoLudicus!5e0!3m2!1ses!2ses!4v1579265212359!5m2!1ses!2ses"
              frameBorder="0"
              allowFullScreen=""
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;
