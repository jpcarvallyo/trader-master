import React from 'react';
import './style.css';

function Spread({ spread }) {
	console.log('Spread: ', spread)
	return (
		<div className="spread-area">
          <ul>
            <li className="profit-zone">
              Profit Amount (Base Order): <span>${spread.profits.amount}</span> at <span>${spread.profits.price}</span>
            </li>
            <li>
              Base Order: <span>${spread.targets.initialBuyIn.amount}</span> at <span>${spread.targets.initialBuyIn.price}</span>
            </li>
            <li>
              Safety Order 1: <span>${spread.targets.safety1.amount}</span> at <span>${spread.targets.safety1.price}</span>
            </li>
            <li>
              Safety Order 2: <span>${spread.targets.safety2.amount}</span> at <span>${spread.targets.safety2.price}</span>
            </li>
            <li>
              Safety Order 3: <span>${spread.targets.safety3.amount}</span> at <span>${spread.targets.safety3.price}</span>
            </li>
          </ul>
        </div>
	)
}

export default Spread
