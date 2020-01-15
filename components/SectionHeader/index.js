import React from 'react';

const SectionHeader = ({ title, text }) => {
  return (
      <div className="section-header">
          <div className="text-wrapper">
              <h1>{title}</h1>
              <p>{text}</p>
            </div>
        </div>
  );
};

export default SectionHeader;
