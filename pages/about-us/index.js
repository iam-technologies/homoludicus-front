import React from 'react';
import { TableBody } from '@material-ui/core';
import Layout from '../../components/Layout';

const aboutUs = () => {
  const team = ['Corey Hale', 'Evan Boyd', 'Randy Frazier'];
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
            <form>
              <input type="text" name="name" value="Escriu el teu nom" />
              <input type="email" value="El teu email" />
              <input type="text" value="Asumpte" />
              <input type="text" className="message" value="Escriu el teu missatge" />
              <div className="button-div">
                <button type="submit" className="button-yellow">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default aboutUs;
