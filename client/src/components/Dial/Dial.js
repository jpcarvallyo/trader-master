import { useRef } from 'react'

function Dial({ cargo }) {
	const { buttonHandler, priceAdjuster, adjusterHandler, baseAmount, inputHandler, desiredPercentage, percentageHandler } = cargo;
	const percentageInput = useRef(null);


	return (
		<form onSubmit={buttonHandler} >
			<label>
				<p>Price to use:</p>
				<input type="number" name="priceAdjuster" value={priceAdjuster} onChange={adjusterHandler}/>
			</label>
			<label>
				<p>Amount to use:</p>
				<input type="number" name="name" value={baseAmount} onChange={inputHandler}/>
			</label>
			<label>
				<p>Profit Percentage:</p>
				<input type="number" ref={percentageInput} name="percentage" value={desiredPercentage} onChange={percentageHandler}/>
			</label>
		</form>
	)
}

export default Dial
