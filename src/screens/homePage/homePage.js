import React, { useState } from 'react';
import './homePage.css'; // Assurez-vous d'avoir un fichier styles.css avec les styles correspondants

function HomePage() {
  const [moved, setMoved] = useState(false);

  const moveDiv = () => {
    setMoved(true);
  };

  return (
    <div className="container">
      <div className={`div1 ${moved ? 'moved' : ''}`}>
        <button onClick={moveDiv}>Déplacer</button>
      </div>
      {moved && <div className="div2 active"></div>}
    </div>
  );
};

export default HomePage;