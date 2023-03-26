import { useEffect, useState, useRef } from 'react';
import { constants } from './constants.js';
// import { getSpread } from '../../services/calculations.js';
import './style.css';

function CorrelationCenter ({ correlationData }) {
  const [view, setView] = useState(constants.TWENTY_FOUR_HR_PC);
	const [isActive, setActive] = useState('percentChange');
	const [correlationTitle, setCorrelationTitle] = useState(constants.PERCENT_CHANGE);
	const correlationElement = useRef('');
  
  useEffect(() => {
		window.addEventListener('keyup', switchCorrelations);
    return () => window.removeEventListener('keyup', switchCorrelations);
  }, [view, correlationTitle]);

	const buttonHandler = (event) => {
		const searcher = /24/;
		const value = event.target.textContent;
		console.log('value: ', searcher.test(value));

		// document.querySelector()
		// event.target.classList.add('active');

		if (searcher.test(value)) {
			setView(constants.TWENTY_FOUR_HR_PC);
			setActive('percentChange');
			setCorrelationTitle(constants.PERCENT_CHANGE);
		} else {
			setView(constants.MARKET_CAP);
			setActive('marketCap');
			setCorrelationTitle(constants.MARKET_CAP);
		}

	}

	function switchCorrelations(e) {
    console.log('key: ', e.key)
		console.log(correlationElement)
    switch(e.key.toUpperCase()) {
      case 'ARROWLEFT':
				const value = view === constants.TWENTY_FOUR_HR_PC ? constants.TWENTY_FOUR_HR_PC : constants.MARKET_CAP;
        // setView(constants.TWENTY_FOUR_HR_PC);
        setView(value);
				setActive('percentChange');
				setCorrelationTitle(constants.PERCENT_CHANGE);
        break;
			case 'J':
				setView(constants.TWENTY_FOUR_HR_PC);
				setActive('percentChange');
				setCorrelationTitle(constants.PERCENT_CHANGE);
				break;
      case 'ARROWRIGHT':
        setView(constants.MARKET_CAP);
				setActive('marketCap');
				setCorrelationTitle(constants.MARKET_CAP);
        break;
			case 'L':
				setView(constants.MARKET_CAP);
				setActive('marketCap');
				setCorrelationTitle(constants.MARKET_CAP);
				break;
      default:
        return;
    }
  }
  
  return (
		<aside className="correlation-section" ref={correlationElement}>
        <h3 className="title">Correlation by</h3>
				<div className="toggler" onClick={buttonHandler}>
					<button className={`percentChange ${isActive === 'percentChange' ? 'active': null}`}>24hr % &Delta;</button>
					<button className={`marketCap ${isActive === 'marketCap' ? 'active': null}`}>Market Cap</button>
				</div>
        {(view === constants.TWENTY_FOUR_HR_PC && <ul>
          {(correlationData && correlationData.per_change.map(item => {
            return (<li key={`${item.pair[0].name + item.pair[1].name}`}>
							<div>
								<h1>{item.pair[0].name}</h1>
								<div className="info">
									<span>Price: ${item.pair[0].price}</span>
									<span>&Delta;: {item.pair[0].perChange}%</span>
								</div>
							</div>
              {/* <p>{item.pair[0].name}: ${item.pair[0].price}, &Delta;: {item.pair[0].perChange}%</p> */}
              <p><span>Pair &Delta;:</span> <span> {item.perDiffBtwnPairs}%</span></p>
							<div>
								<h1>{item.pair[1].name}</h1>
								<div className="info">
									<span>Price: ${item.pair[1].price}</span>
									<span>&Delta;: {item.pair[1].perChange}%</span>
								</div>
							</div>
              {/* <p>{item.pair[1].name}: ${item.pair[1].price}, &Delta;: {item.pair[1].perChange}%</p> */}
            </li>)
          }))}
        </ul>)}
				{(view === constants.MARKET_CAP && <ul>
          {(correlationData && correlationData.market_cap.map(item => {
            return (<li key={`${item.pair[0].name + item.pair[1].name}`}>
              {/* <p><span>{item.pair[0].name}: ${item.pair[0].price}</span> <span>Market Cap: {item.pair[0].marketCap}</span></p> */}
							<div>
								<h1>{item.pair[0].name}</h1>
								<div className="info">
									<span>Price: ${item.pair[0].price}</span>
									<span>Market Cap: ${item.pair[0].marketCap}</span>
								</div>
							</div>
              <p><span>Pair &Delta;</span> <span>${item.market_cap_diff}</span></p>
							<div>
								<h1>{item.pair[1].name}</h1>
								<div className="info">
									<span>Price: ${item.pair[1].price}</span> 
									<span>Market Cap: ${item.pair[1].marketCap}</span>
								</div>
							</div>
              {/* <p>{item.pair[1].name}: ${item.pair[1].price}, <span>Market Cap: {item.pair[1].marketCap}</span></p> */}
            </li>)
          }))}
        </ul>)}
      </aside>
	);
}

export default CorrelationCenter;