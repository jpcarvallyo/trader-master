import { useEffect, useState } from "react";
import Spread from "../Spread/index.js";
import Dial from "../Dial/Dial.js";
import { getSpread } from "../../services/calculations.js";
import { numberWithCommas, round } from "../../Utilities/Math/index.js";
import "./style.css";

function Card({ marketData, selectedCoin, correlationData }) {
  const [state, setState] = useState(null);
  const [colorIndicator, setColorIndicator] = useState(null);
  const [volumeColor, setVolumeColor] = useState(null);
  const [baseAmount, setbaseAmount] = useState(32303);
  const [spread, setSpread] = useState(null);
  const [desiredPercentage, setDesiredPercentage] = useState(2);
  const [cd] = useState(correlationData);
  const [priceAdjuster, setPriceAdjustment] = useState(null);

  // const title = selectedCoin.toUpperCase();
  // const price = state?.current_price;

  useEffect(() => {
    const regex = /-/;
    const desiredItem =
      marketData &&
      marketData.filter((item) => {
        if (item.symbol === selectedCoin) {
          return item;
        }
      })[0];
    const volume = Number(desiredItem.total_volume);
    const price = Number(desiredItem?.current_price);

    if (desiredItem && regex.test(desiredItem.price_change_24h)) {
      setColorIndicator("#EB5742");
    } else {
      setColorIndicator("#439E3C");
    }

    if (volume > 500000000) {
      setVolumeColor("#439E3C");
    } else if (volume > 200000000) {
      setVolumeColor("#ebc342");
    } else {
      setVolumeColor("#EB5742");
    }
    setState(desiredItem);
    const preferredPrice = priceAdjuster ? priceAdjuster : price;
    let updatedSpread = getSpread(
      preferredPrice,
      baseAmount,
      desiredPercentage
    );
    setSpread(updatedSpread);
  }, [marketData, selectedCoin, desiredPercentage, baseAmount, priceAdjuster]);

  const inputHandler = (event) => {
    event.preventDefault();
    setbaseAmount(event.target.value);
    setSpread(getSpread(state.current_price, event.target.value));
  };

  const percentageHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setDesiredPercentage(event.target.value);
  };

  const buttonHandler = (event) => {
    event.preventDefault();
    setSpread(getSpread(state.current_price, baseAmount));
    console.log(spread);
  };

  const adjusterHandler = (event) => {
    event.preventDefault();
    setSpread(getSpread(event.target.value, baseAmount));
    setPriceAdjustment(event.target.value);
    console.log(spread);
  };

  const cargo = {
    buttonHandler,
    priceAdjuster,
    baseAmount,
    inputHandler,
    desiredPercentage,
    percentageHandler,
    adjusterHandler,
  };

  return (
    state &&
    cd && (
      <div className="Card">
        <div
          className="left-container"
          style={{ backgroundColor: colorIndicator }}
        >
          <h1 className="title">{state.symbol}</h1>
        </div>
        <header className="main-area">
          <img src={state.image.large} alt="" />
          <Spread spread={spread} />
          <div className="price-header">
            <h1>
              {state.name}
              <img src={state.image.thumb} alt="" />
            </h1>
            <h1 className="price-indicator">
              Current Price: ${state.current_price}
            </h1>
            <h2 className="price-change">
              Price change in 24hrs:{" "}
              <span style={{ color: colorIndicator }}>
                {state.price_change_24h}
              </span>
            </h2>
            <h2 className="percent-change">
              Percent change in 24hrs:{" "}
              <span style={{ color: colorIndicator }}>
                {round(state?.price_change_24h, 2)}
              </span>
            </h2>
            <h2 className="volume">
              Total Volume:{" "}
              <span style={{ color: volumeColor }}>
                ${numberWithCommas(state?.total_volume)}
              </span>
            </h2>
          </div>
          <Dial cargo={cargo} />
        </header>
      </div>
    )
  );
}

export default Card;
