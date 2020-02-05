import data from './data.js'

// [x] Total profit for 2017

// Filtering to 2017 Purchase Year
const purchasesIn2017 = data.filter(vehicle => {
    let purchaseYear = vehicle.purchase_date.split("-")[0]
    return purchaseYear === "2017"
})

// Mapping out a new array of just profits
const profitsIn2017 = purchasesIn2017.map(purchase => {
    return purchase.gross_profit
})

// Reducing that array
const totalProfit = profitsIn2017.reduce((acc, cv) => acc + cv, 0);
console.log("TOTAL PROFITS IN 2017: ", totalProfit);


// [x] In which month did they sell the most cars?

// Setting up a global place to compare the highest
let highest = {
    monthNum: '',
    monthTotal: 0,
    salesperson: '',
    salespersonTotal: 0
}

// Iterating over each month
for (let i = 1; i <= 12; i++) {
    // The month needs a leading zero before it becomes double digit
    let currentMonth = `${i}`.padStart(2, '0')
    // Filter purchases by month
    const monthsPurchases = purchasesIn2017.filter(purchase =>{
        let purchaseMonth = purchase.purchase_date.split("-")[1]
        return purchaseMonth === currentMonth
    })
    // Reduce month's purchases
    const monthsProfits = monthsPurchases.reduce((acc, cv) => acc + cv.gross_profit, 0)
    // console.log("Purchase total for month ", i, " = ", monthsProfits);
    if (monthsProfits > highest.monthTotal) {
        highest.monthNum = currentMonth
        highest.monthTotal = monthsProfits
    }
}

console.log("Highest Month: ", highest.monthNum)
console.log("Totaling: ", highest.monthTotal)

// [x] Which salesperson sold the most cars?
// [x] Which salesperson made the most profit?

// Don't quite get this, but found it here:
// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
const onlyUnique = (value, index, self) => { 
    return self.indexOf(value) === index;
}

// Unique List of Salespeople's Last Names
// Admittedly only taking into account their last name...
const salespeople = purchasesIn2017.map(purchase => {
    return purchase.sales_agent.last_name;
}).filter(onlyUnique)

// console.log("List of salespeople: ", salespeople)

salespeople.forEach(person => {
    const personsSales = purchasesIn2017.filter(purchase =>{
        return person === purchase.sales_agent.last_name
    })
    // console.log(person, personsSales)

    const personProfits = personsSales.reduce((acc, cv) => acc + cv.gross_profit, 0)
    
    console.log(person, "sold ", personsSales.length, " cars with a gross profit of $", personProfits)

    if (personProfits > highest.salespersonTotal) {
        highest.salesperson = person
        highest.salespersonTotal = personProfits
    }
})

console.log(highest.salesperson, "sold the most at", highest.salespersonTotal)

// [ ] Which model was the most popular?
// [ ] Which bank provided the most loans to our customers?
// [ ] In which month did zero cars get sold?