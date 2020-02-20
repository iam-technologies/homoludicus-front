import React from 'react';
import Link from 'next/link';

const BonusSection = () => {
  return (
    <div className="bonus-div">
      <h4>Bonus per a escoles, associacions i professionals</h4>
      <Link href="/erizos-a-la-carrera">
        <a>
          <button className="button-black">Veure més</button>
        </a>
      </Link>
    </div>
  );
};

export default BonusSection;
