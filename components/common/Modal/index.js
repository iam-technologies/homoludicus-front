import React from 'react';
import BookingForm from '../../BookingForm';

const Modal = (props) => {
  const { modalTitle, setModalState, startDate, endDate } = props;
  return (
    <div className="booking-modal">
      <div className="modal-layer">
        <div className="center-modal">
          <div className="modal-header">
            <h3 className="modal-title">{modalTitle}</h3>
            <div className="close-icon-div" onClick={() => { setModalState(false); }}>
              <h3>X</h3>
            </div>
          </div>
          <BookingForm startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
