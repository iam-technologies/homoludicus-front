import React from 'react';

const SingleEvent = () => {
  const contextText = (
    <p>A partir de las Semillas de la Esperanza tres grandes ciudades surgen al Reino de la Vida pero, ¿podrán defenderlas las fuerzas de Order? ¿O caerán en manos de Chaos, Death o Destruction?
      <br /><br />Estación de Guerra es una campaña de Warhammer Age of Sigmar a escala global. Los resultados de esta campaña serán determinantes para la historia de Age of Sigmar y tendrán grandes consecuencias en el futuro de los Reinos Mortales.
      <br /><br />Las batallas tendrán lugar en las Semillas de la Esperanza, las primeras ciudades libres fundadas por las fuerzas de Order en el Reino de la Vida. El resultado de cada enfrentamiento dará una victoria a una de las cuatro Grandes Alianzas:
      <br /><br />Chaos, Order, Death o Destruction.
      <br /><br /> Nosotros y toda la Europa continental lucharemos para defender o conquistar PHOENICIUM.
      <br /><br />Los participantes de E.U.A. o Canadá, lucharán por la CIUDAD VIVA.
      <br /><br />En Reino Unido, Irlanda, Australia, Nueva Zelanda, Asia y el resto de países no nombrados, por REFUGIO de AGUAGRIS.
      <br /><br />Tenemos la oportunidad de cambiar la historia de los Reinos Mortales. Los resultados de las batallas y los puntos ganados por las distintas facciones ayudarán a decidir el futuro de la línea temporal.
    </p>
  );

  const instructions = (
    <p>Para poder jugar la campaña os harán falta un mínimo de 3 warscrolls (unidades) y 1 héroe (pintados o sin pintar). Más adelante, en las semanas 3 y 4, os hará falta algún monstruo, pero dado que serán batallas en grupo, mientras alguien de cada bando tenga, será suficiente. Aunque… ¿quien no quiere tener su propio monstruo?
      <br /><br />Para ayudaros haremos promociones y descuentos especiales durante los Sábados por la mañana, en nuestros “Special Events”. Todos aquellos que juguéis, deberéis decirnos vuestra talla de camisera para una sorpresa final.
      <br /><br />La campaña tendrá una duración de un mes (del 18 de Julio al 14 de Agosto), donde los jugadores obtendrán puntos de campana y darán puntos a su facción por:
      <br /><br />– Partidas jugadas (1 punto por jugar una partida, 2 puntos por ganar una partida, hasta un máximo de 3 partidas jugadas de cada escenario).
      <br /><br />– Nuevos warscrolls (unidades/héroes/monstruos) comprados y/o pintados (1 punto por cada warscroll cada semana hasta un máximo de 3 por semana).
      <br /><br />Cada semana se jugará un escenario diferente y los jugadores podrán presentar nuevas miniaturas pintadas de su ejército, sumando puntos por su facción. Las semanas de Juego serán:
      <br /><br />1 Semana: 18 Julio-24 Julio CHOQUE DE LÍNEAS DE BATALLA
      <br /><br />2 Semana: 25 Julio-31 Julio EMERGE UN CAMPEÓN
      <br /><br />3 Semana : 1 Agosto-7 Agosto PODER MONSTRUOSO
      <br /><br />4 Semana: 8 Agosto-14 Agosto RUINA Y DESOLACIÓN
      <br /><br />Los jugadores podréis acordar enfrentamientos durante toda la semana, excepto lunes por la mañana, sábado 23 por la mañana y domingos (podemos poner en común vuestros móviles o e-mails o, si queréis, organizar un grupo de whatsapp).
      <br /><br />Además todos los sábados por la mañana serán los días de eventos especiales y, durante todo el día, el principal momento de reunión donde los jugadores podrán encontrarse y jugar distintas partidas con diferentes adversarios o una partida multitudinaria la última semana en, la BATALLA FINAL.
      <br /><br />Como extra tendremos diferentes “SPECIAL EVENTS”, eventos especiales donde los participantes podréis ampliar vuestros ejércitos, probarlos con distintas variantes y sumar puntos adicionales para vuestras facciones.
      <br /><br />
    </p>
  );

  const eventDate = {
    day: '22',
    month: 'JUNY',
    hour: '17:00h',
    place: 'Carrer Sant Jaume, 73, Granollers'
  };

  const headerImg = '/images/header-event.jpg';

  return (
    <section className="event-sec">
      <header
        className="event-header"
        style={{
          backgroundImage: `url(${headerImg})`,
          backgroundSize: 'cover'
        }}
      >
        <div className="darken" />
      </header>
      <div className="event-title">
        <h1>Liga Age of Sigmar: Estación de Guerra</h1>
        <h3>Las fuerzas de Orden deben defender el Reino de la Vida</h3>
      </div>
      <div className="event-content-div">
        <div className="event-data">
          <h2>{eventDate.month}</h2>
          <h1>{eventDate.day}</h1>
          <h2>{eventDate.hour}</h2>
          <p>{eventDate.place}</p>
          <div className="button-div">
            <button className="button-yellow">Asistir-hi</button>
          </div>
        </div>
        <div className="event-description">
          <p className="p-title">Context</p>
          <div className="text">
            {contextText}
          </div>
          <p className="p-title">Com participar-hi?</p>
          <div className="text">
            {instructions}
          </div>
          <div className="button-div">
            <button className="button-yellow">Asistir-hi</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleEvent;
