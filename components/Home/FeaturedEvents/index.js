import React from 'react';

const FeaturedEvents = () => {
  return (
      <div className="featured-events">
          <img src="/images/event.jpeg" alt="event" />
          <div className="event-info">
              <h3 className="event-title">
                    Torneig Warhammer 2019
                </h3>
              <div className="event-desc">
                    Lorem ipsum dolor sit amet consectetur adipiscing,
                    elit ullamcorper himenaeos eros fermentum.
                    Sollicitudin tellus laoreet faucibus tortor.
                </div>
              <div className="event-contact-share">
                  <div className="event-contact">
                      <button className="button button-yellow">Apunta't</button>
                    </div>
                  <div className="event-share">
                      <img src="/icon/icon-share-white.svg" alt="share" />
                    </div>
                </div>
            </div>
        </div>
  );
};

export default FeaturedEvents;
