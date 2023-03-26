import { useEffect, useState, useRef } from 'react';
import { getSpread } from '../../services/calculations.js';
import './style.css';

function LayoutChanger ({ tileHandler, view }) {
  

  
  useEffect(() => {
    
  }, []);
  
  

  
  
  return (
		<div className="format-section" onClick={tileHandler}>
			<h1 className={view === 'CARD' ? 'active': null}>Card</h1>
			<h1 className={view === 'CORRELATION' ? 'active': null}>Correlation</h1>
		</div>
	);
}

export default LayoutChanger ;