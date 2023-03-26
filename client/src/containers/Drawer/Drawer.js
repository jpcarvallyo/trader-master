import { useRef } from 'react';
import { removeStyles } from '../../Utilities/Dom/index.js';
import './style.css';

function Drawer({ marketData, clickHandler, selectedCoin }) {
  // console.log('This is the marketData: ', marketData);
  console.log('selectedCoin: ', selectedCoin);
  const list = useRef();
  const applyColorToAll = (node) => {
    const regex = /-/;
    const value = (node && regex.test(node.price_change_24h)) ? '#EB5742' : '#439E3C';

    return value;
  };

  const leaveHandler = (event) => {
    removeStyles(list);
    console.log(list)
  }

  return (
    <div className="Drawer">
        {/* {price ? price.map(item => <h1>{item[0]}: {item[1]}</h1>) : null} */}
        <ul onMouseMove={clickHandler} ref={list}>
					<li className="title" key="title">Symbol</li>
					{marketData ? marketData.map(item => (<li key={item.symbol} style={{
            backgroundColor: applyColorToAll(item)
          }} className={(selectedCoin === item.symbol) ? 'selectedTicker' : null}>{item.symbol}</li>)): null}
				</ul>
     
    </div>
  );
}

export default Drawer;