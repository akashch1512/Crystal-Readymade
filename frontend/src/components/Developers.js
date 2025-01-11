import React from 'react';
import './Developers.css';

const Developers = () => {
  return (
    <div className="developers-container">
      <h1>Meet Developers</h1>
      <div className="developer-card">
        <img src="boy.avif" alt="Boy Developer" />
        <h2>Gaurav</h2>
        <p>Backend Developer</p>
      </div>
      <div className="developer-card">
        <img src="girl.jpg" alt="Girl Developer" />
        <h2>Gaytri</h2>
        <p>Frontend Developer</p>
      </div>
    </div>
  );
};

export default Developers;
