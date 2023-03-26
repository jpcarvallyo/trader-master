import { useRef } from 'react';
import './style.css';

function Drawer({ marketData, clickHandler, selectedCoin }) {
  const list = useRef();
  const applyColorToAll = (node) => {
    const regex = /-/;
    const value = (node && regex.test(node.price_change_24h)) ? '#EB5742' : '#439E3C';

    return value;
  };

  return (
    <div className="Drawer">
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