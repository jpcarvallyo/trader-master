import { useState, useEffect } from 'react';
import Drawer from '../Drawer/Drawer';
import Card from '../../components/Card/Card.js';
import LayoutChanger from '../../components/LayoutChanger/LayoutChanger';
import CorrelationCenter from '../../components/CorrelationCenter/CorrelationCenter.js';
import { getHighestCorrelation, marketCapCorrelation } from '../../services/calculations.js';
import { removeStyles } from '../../Utilities/Dom/index.js';
import './style.css';

function Layout({ marketData }) {
  const [selectedCoin, setSelectedCoin] = useState('btc');
  const [correlationData, setCorrelationData] = useState(null);
  const [view, setView] = useState('CARD');
  const list = document.querySelector('div.Drawer ul');

  const clickHandler = (event) => {
    const node = event.target;
    const list = node.parentNode.children;
    removeStyles(list);
  
    if (node.classList.contains('title')) {
      return 
    } else {
      setSelectedCoin(event.target.textContent);
    }  
	};

  const printCoinData = (direction) => {
    console.log('marketdata: ', marketData)
    const data = Object.entries(marketData);
    
    removeStyles(list.children);
    for (let item of data) {
      
      if (item[1].symbol.toLowerCase() === selectedCoin.toLowerCase()) {
        const index = Number(item[0]);
        let nextItem = null;

        // Handle going down
        if (direction === 'down') {
          if (index === data.length - 1) {
            nextItem = data[0][1];
          } else {
            nextItem = data[index + 1][1];
          }
        }

        // Handle going up
        if (direction === 'up') {
          if (index === 0) {
            nextItem = data[data.length - 1][1];
          } else {
            nextItem = data[index - 1][1];
          }
        }
      
        setSelectedCoin(nextItem.symbol);
      }
    }
  };
  

  function onKeyup(e) {
    switch(e.key.toUpperCase()) {
      case 'ARROWDOWN':
        printCoinData('down');
        break;
      case 'ARROWLEFT':
        printCoinData('down');
        break;
      case 'L':
        printCoinData('down');
        break;
      case 'J':
        printCoinData('up');
        break;
      case 'ARROWUP':
      printCoinData('up');
        break;
      case 'ARROWRIGHT':
        printCoinData('up');
        break;
      case 'I':
        const value = view === 'CARD' ? 'CORRELATION' : 'CARD';
        setView(value);
        break;
      case 'O':
        const value1 = view === 'CORRELATION' ? 'CARD' : 'CORRELATION';
        setView(value1);
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const getHC = async () => await getHighestCorrelation(marketData);
      const getMC = async () => await marketCapCorrelation(marketData);
      const marketCData = await getMC();
      const correlationed = await getHC();
      const correlationBigObj = {
        market_cap: marketCData,
        per_change: correlationed,
      }
      setCorrelationData(correlationBigObj)
    }
    fetchData();
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [selectedCoin, view]);

  const tileHandler = (event) => {
    const value = event.target.textContent.toUpperCase();
    setView(value);
  }

  
  return (
    <div className="Layout">
      <LayoutChanger tileHandler={tileHandler} view={view} />
      <Drawer marketData={marketData} clickHandler={clickHandler} selectedCoin={selectedCoin} />
      {(correlationData && view === "CARD" && <Card marketData={marketData} selectedCoin={selectedCoin} correlationData={correlationData} />)}
      {(correlationData && view === "CORRELATION" && <CorrelationCenter correlationData={correlationData} />)}
    </div>
  );
}

export default Layout;