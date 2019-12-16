import React from 'react';
import GoogleMap from '../../GoogleMap';


export default () => (
  <div className="container_send_addres">

    <div className="send_info_office">
      <div className="flex_item address">
        <div>
          <p>C/ Espronceda 27, 1ºC</p>
          <p>28003 Madrid</p>
        </div>
        <p>Tel. 914 415 645</p>
        <p className="last">Horario de (L-V) 10:30h a 13:30 y de 16:30 a 19:00h.</p>
      </div>

      <div className="flex_item flex_map">
        <GoogleMap
          isMarkerShown
          position={{ lat: 40.440628, lng: -3.695549 }}
          zoom={18}
        />
      </div>
    </div>

  </div>
);
