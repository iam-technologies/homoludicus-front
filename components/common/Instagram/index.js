import React from 'react';
import infoSource from '../../../utils/infoSource';

const Instagram = () => {
  return (
    <section className="instagram_ui">
      <div className="instagram_ui-title">
        ¡Síguenos en Instagram!
        <a href={`https://www.instagram.com/${infoSource.instaUrl}`} target="blank" className="instagram_ui-title__link">
          {infoSource.instaRef}
        </a>
      </div>
      <div className="instagram_ui-container">
        {/* <!-- LightWidget WIDGET --> */}
        <iframe src="//lightwidget.com/widgets/12295743330d5a0893efe6dcfcb6bf7e.html" scrolling="no" className="lightwidget-widget" title="instagram-widget" />

      </div>


    </section>
  );
};

export default Instagram;
