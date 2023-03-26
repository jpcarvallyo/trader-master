// Input:
// * estateSize - the total value of a person’s estate (similar to ‘net worth’)
// * oldGifts - list of existing gifts a person is donating to charity
// * newGifts - list of new/updated gifts a person is donating to charity
// {
//    nonProfit: string,
//    amount: number,
//    amountType: 'dollar' | 'percent'
// }
// Instructions:
// 1. Calculate the difference in total value between the new and old gifts in dollarsNew and old gift difference example:Old gifts total: 150New gifts total: 100Expected output: -50Part 1 expected output: -19500
// 2. Return the difference in total value between the new and old gifts by non-profitExpected output:{
// 3.  'Planned Parenthood': 1000,
// 4.  'Doctors Without Borders': -500,
// 5.  'United Way': -50000, 
// 6.  'Red Cross': 30000
// 7. }

const estateSize = 1000000;

const oldGifts = [
  {
    nonProfit: "Planned Parenthood",
    amount: 10,
    amountType: "percent",
  },
  {
    nonProfit: "Doctors Without Borders",
    amount: 1000,
    amountType: "dollar",
  },
  {
    nonProfit: "United Way",
    amount: 5,
    amountType: "percent",
  }];

const newGifts = [
  {
    nonProfit: "Planned Parenthood",
    amount: 10,
    amountType: "percent",
  },
  {
    nonProfit: "Planned Parenthood",
    amount: 1000,
    amountType: "dollar",
  },
  {
    nonProfit: "Doctors Without Borders",
    amount: 500,
    amountType: "dollar",
  },
  {
    nonProfit: "Red Cross",
    amount: 3,
    amountType: "percent",
  }];


function calculateTotalDiff(estateSize, oldGifts, newGifts) {

  const calculateTotalAmount = (estateSize, list) => {
    return list.reduce( (acc, curr) => {
      let amount = curr.amountType === "percent" ? (curr.amount / 100) * estateSize : curr.amount;
      return acc + amount;
    
    }, 0);
  
  };
  
  // console.log(calculateTotalAmount(estateSize, oldGifts))
  
  // Return difference between totalValue of newList and oldList
  return calculateTotalAmount(estateSize, newGifts) - calculateTotalAmount(estateSize, oldGifts) 
}


function calculateDiffByNonProfit(estateSize, oldGifts, newGifts) {
  //todo
  const hash = {};
  
  const populateHash = () => {
//     Populate hash first
    
    newGifts.forEach((item) => {
      let amount = item.amountType === "percent" ? (item.amount / 100) * estateSize : item.amount;
      if (hash[item.nonProfit]) {
        hash[item.nonProfit] = hash[item.nonProfit] + amount;
      } else if (hash[item.nonProfit] <= 0) {
				hash[item.nonProfit] = amount;
			} else {
         hash[item.nonProfit] = amount;
      }
    });
    
    
//     Calculate difference with second list
    oldGifts.forEach((item) => {
       let amount = item.amountType === "percent" ? (item.amount / 100) * estateSize : item.amount;
      if (hash[item.nonProfit]) {
        hash[item.nonProfit] = hash[item.nonProfit] - amount;
      }else if (hash[item.nonProfit] <= 0) {
				hash[item.nonProfit] = amount;
			}  else {
         hash[item.nonProfit] = - amount;
      }
    });
    
  };
  
  populateHash(estateSize, oldGifts, newGifts);
  
  return hash;
  
}

console.log(calculateTotalDiff(estateSize, oldGifts, newGifts));
console.log(calculateDiffByNonProfit(estateSize, oldGifts, newGifts));