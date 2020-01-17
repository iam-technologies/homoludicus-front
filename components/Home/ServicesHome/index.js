import React from 'react';
import Link from 'next/link';

const ServicesHome = () => {
  return (
    <div className="services-div">
      <div className="services-titles">
        <h2>Serveis</h2>
        <h5 className="subtitle">
          Petita descripció dels serveis
        </h5>
      </div>
      <div className="bonus-games-div">
        <div className="bonus-div">
          <h4>Bonus per a escoles, associacions i professionals</h4>
          <Link href="/erizos-a-la-carrera">
            <a>
              <button className="button-black">Veure més</button>
            </a>
          </Link>
        </div>
        <div className="games-div">
          <h4>Zona de Jocs</h4>
          <Link href="/erizos-a-la-carrera">
            <a>
              <button className="button-black">Veure més</button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesHome;
