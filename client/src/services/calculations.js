import { numberWithCommas } from "../Utilities/Math";

export const round = (number, decimalPlaces) => {
	const factorOfTen = Math.pow(10, decimalPlaces);
	return Math.round(number * factorOfTen) / factorOfTen;
};

export const getSpread = (price, amount, percentage = 2) => {
	const increment = price * (percentage / 100);
	const base = amount * 0.18;
	const baseProfit = round((base + base * (percentage / 100)) - base, 0);
	const safety = amount * 0.27;
	const spread = {
		value: increment,
		range: [
			price - (increment * 3),
			price - (increment * 2),
			price - increment, 
			Number(price), 
			Number(price) + Number(increment), 
			Number(price + Number(increment * 2)),
		],
	}
	const bettingSpread = {
			profits: {
				amount: baseProfit,
				price: round(spread.range[4], 3),
			},
			targets: { 
					initialBuyIn: {
						amount: round(base, 0),
						price: price,
					},
					safety1: {
						amount: round(safety, 0),
						price: round(spread.range[2], 3),
					},
					safety2: {
						amount: round(safety, 0),
						price: round(spread.range[1], 3),
					},
					safety3: {
						amount: round(safety, 0),
						price: round(spread.range[0], 3),
					},
			},
		};
	
	
	return { ...spread, ...bettingSpread, amount: Number(amount)  };
};

const correlationScore = (twentyFourHr, market_cap_data) => {
	// Coin Marketcap data methodology and scaling system:
	// After tallying the data, we distributed scores based on the relative performance of the exchanges in the above categories. The score is a relative point scaling system from 0 to 1,000. The top exchange will always be given 1,000 points, and the rest of the exchanges are given scores based on a relative comparison against that exchange. High scores would reflect high amounts of web traffic, which is a good indication of high user count.
	const value = 100 - twentyFourHr;
	return value;
}

export const marketCapCorrelation = (marketData) => {
	const correlation = () => {
		const arr = [];
		const perDiffArr = [];
		const perSortArr = marketData.sort((a, b) => {
				const marketCapA = a.market_cap;
				const marketCapB = b.market_cap;
				return marketCapA - marketCapB;
		});

		for(let i = 0; i <= perSortArr.length - 1; i++) {
			(function () {
				if (i === perSortArr.length - 1) return;
				const { market_cap } = perSortArr[i];
				const item = market_cap;
				const nextItem = perSortArr[i + 1].market_cap;
				
				const diffValue = (nextItem > item) ? nextItem - item : item - nextItem;
				
				const obj = {
					market_cap_diff: diffValue,
					comparison: `${perSortArr[i].symbol} + ${perSortArr[i + 1].symbol}`,
					pair: [
						{
							name: perSortArr[i].symbol,
							price: numberWithCommas(perSortArr[i].current_price),
							marketCap: numberWithCommas(item),
						}, {
							name: perSortArr[i + 1].symbol,
							price: numberWithCommas(perSortArr[i + 1].current_price),
							marketCap: numberWithCommas(nextItem),
						}
					]
				}
				perDiffArr.push(obj.perDiffBtwnPairs)
				arr.push(obj)
			})();
		};


		const sortedArr = arr.sort(function (a, b) {
			return a.market_cap_diff - b.market_cap_diff
		}).map(item => {
			const obj = {...item}
			return {...obj, market_cap_diff: numberWithCommas(item.market_cap_diff)}
		})

		return sortedArr;
	}
	return correlation();
}

export const getHighestCorrelation = (marketData) => {
	const correlation = () => {
		const arr = [];
		const perDiffArr = [];
		const perSortArr = marketData.sort((a, b) => {
				const priceA = a.price_change_percentage_24h;
				const priceB = b.price_change_percentage_24h;
				return priceA - priceB;
		});

		for(let i = 0; i <= perSortArr.length - 1; i++) {
			(function () {
				if (i === perSortArr.length - 1) return;
				const { current_price } = perSortArr[i];
				const item = perSortArr[i].price_change_percentage_24h;
				const nextItem = perSortArr[i + 1].price_change_percentage_24h;

				const diffValue = (nextItem > item) ? nextItem - item : item - nextItem;
				
				const obj = {
					perDiffBtwnPairs: round(diffValue, 5),
					correlationScore: round(correlationScore(diffValue), 2),
					comparison: `${perSortArr[i].symbol} + ${perSortArr[i + 1].symbol}`,
					pair: [
						{
							name: perSortArr[i].symbol,
							price: current_price,
							perChange: item,
						}, {
							name: perSortArr[i + 1].symbol,
							price: perSortArr[i + 1].current_price,
							perChange: nextItem,
						}
					]
				};

				perDiffArr.push(obj.perDiffBtwnPairs)
				arr.push(obj)
			})();
		};

		const sortedArr = arr.sort(function (a, b) {
			return a.perDiffBtwnPairs - b.perDiffBtwnPairs
		});
		
		return sortedArr;
	};
	
	return marketData && correlation()
};