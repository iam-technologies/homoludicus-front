import React from 'react';
import GoogleMap from '../../GoogleMap';
import infoSource from '../../../utils/infoSource';

export default () => (
  <div className="container_send_addres">

    <div className="send_info_office">
      <div className="flex_item address">
        <div>
          <p>{infoSource.address}</p>
        </div>
        <p>{infoSource.tel}</p>
        <p className="last">Horario de (L-V) 10:30h a 13:30 y de 16:30 a 19:00h.</p>
      </div>

      <div className="flex_item flex_map">
        <GoogleMap
          isMarkerShown
          position={{ lat: 41.604926, lng: 2.285807 }}
          zoom={18}
        />
      </div>
    </div>

  </div>
);
