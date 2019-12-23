import React from 'react';

const styles = () => {
  return (
    <>
    Basic text.
      <p>Soy un p</p>
      <h1>Soy un h1</h1>
      <h2>Soy un h2</h2>
      <h3>Soy un h3</h3>
      <h4>Soy un h4</h4>
      <h5>Soy un h5</h5>
      <button type="button" className="button button-yellow">Button yellow</button>
      <button type="button" className="button button-black">Button black</button>
      <div style={{ backgroundColor: 'yellow' }}>
        <button type="button" className="button-ghost-black">Button ghost</button>
        <button type="button" className="button-ghost-white">Button ghost</button>
      </div>
    </>
  );
};
export default styles;
