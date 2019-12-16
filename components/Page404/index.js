import React from 'react';
// import { MobileHeader } from '../common';

const Page404 = () => {
  return (
    <section className="not-found-container">
      {/* <MobileHeader
        green
        logo
      /> */}

      <div className="not-found-container-info">
        <h1 className="not-found-container-title-h1">404 - Página no encontrada</h1>
      </div>

      <div
        className="not-found-container-info not-found-container-more_info"
      >
        El contenido que está buscando no se encuentra en la URL introducida
        <br /><br />
        <a href="/">Ir a la home</a>
      </div>

    </section>
  );
};

export default Page404;


// ORIGINAL VERSION

// import React from 'react';

// const page404 = () => (
//   <div>
//     <h1>404 NOT FOUND</h1>
//   </div>
// );

// page404.getInitialProps = async () => {
//   console.log('page404 page: ');
// };

// export default page404;
