import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import React from 'react';


export default compose(
  withProps({
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withGoogleMap,
)(props => (
  <GoogleMap
    center={props.position}
    defaultZoom={4}
    defaultCenter={{ lat: 38, lng: -4 }}
    zoom={props.zoom}
    clickableIcons={false}
    draggable={false}
    options={{
      zoomControl: true,
      zoomControlOptions: { position: window.google.maps.ControlPosition.RIGHT_TOP },
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      rotateControl: false
    }}
  >
    {
        props.isMarkerShown
          && (
          <Marker
            icon="../static/images/icon_map.svg"
            clickable={false}
            position={props.position}
            draggable={false}
          />
          )
      }
  </GoogleMap>
));
