import { useEffect, useState } from 'react';
import { fetchMultiple } from './services/network-calls.js';
import Layout from './containers/Layout/Layout.js';

import './App.css';


function App() {

  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchMultiple();
      setMarketData(response);
    }
    getData();
  }, []);
  

  
  return (
    <div className="App">
      {(marketData && <Layout marketData={marketData} />)}
    </div>
  );
}

export default App;
