import data from './data.js'

// Setting up a global place to compare the highest
let highest = {
    month: {
        num: '',
        profits: 0,
    },
    salesperson: {
        lastName: '',
        grossProfits: 0,
    },
    vehicle: {
        model: '',
        totalSales: 0,
    },
    creditProvider: {
        name: '',
        totalLoans: 0
    }
}
// ------------------------------------------------------------------
// [x] Total profit for 2017
// ------------------------------------------------------------------

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
console.log("Total Profits in 2017: $", totalProfit);


// ------------------------------------------------------------------
// [x] In which month did they sell the most cars?
// ------------------------------------------------------------------

// Iterating over each month
for (let i = 1; i <= 12; i++) {
    // The month needs a leading zero before it becomes double digit
    let currentMonth = `${i}`.padStart(2, '0')
    // Filter purchases by month
    const monthsPurchases = purchasesIn2017.filter(purchase =>{
        let purchaseMonth = purchase.purchase_date.split("-")[1]
        return purchaseMonth === currentMonth
    })

    if (monthsPurchases.length === 0) {
        console.log("There were zero car sales in the month of", currentMonth)
    }

    // Reduce month's purchases
    const monthsProfits = monthsPurchases.reduce((acc, cv) => acc + cv.gross_profit, 0)
    // console.log("Purchase total for month ", i, " = ", monthsProfits);
    if (monthsProfits > highest.month.profits) {
        highest.month.num = currentMonth
        highest.month.profits = monthsProfits
    }
}

console.log(highest.month.num, "was the highest month at $", highest.month.profits)

// ------------------------------------------------------------------
// [x] Which salesperson sold the most cars?
// [x] Which salesperson made the most profit?
// ------------------------------------------------------------------

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

// Filtering the sales for each salesperson
// Reducing their profits to get a grand total
salespeople.forEach(person => {
    const personsSales = purchasesIn2017.filter(purchase =>{
        return person === purchase.sales_agent.last_name
    })
    // console.log(person, personsSales)

    const personProfits = personsSales.reduce((acc, cv) => acc + cv.gross_profit, 0)
    
    // console.log(person, "sold ", personsSales.length, " cars with a gross profit of $", personProfits)

    if (personProfits > highest.salesperson.grossProfits) {
        highest.salesperson.lastName = person
        highest.salesperson.grossProfits = personProfits
    }
})

console.log(highest.salesperson.lastName, "sold the most at", highest.salesperson.grossProfits)

// ------------------------------------------------------------------
// [x] Which model was the most popular?
// ------------------------------------------------------------------
const models = purchasesIn2017.map(purchase => {
    return purchase.vehicle.model;
}).filter(onlyUnique);

// console.log("List of models:", models)

models.forEach(model => {
    const modelSales = purchasesIn2017.filter(purchase =>{
        return model === purchase.vehicle.model;
    });

    // console.log(model, "sold", modelSales.length, "units");

    if (modelSales.length > highest.vehicle.totalSales) {
        highest.vehicle.model = model
        highest.vehicle.totalSales = modelSales.length
    }

})
console.log(highest.vehicle.model, "sold the most at", highest.vehicle.totalSales, "units")

// ------------------------------------------------------------------
// [x] Which bank provided the most loans to our customers?
// ------------------------------------------------------------------
const creditProviders = purchasesIn2017.map(purchase => {
    return purchase.credit.credit_provider;
}).filter(onlyUnique);

// console.log("List of Credit Providers:", creditProviders)

creditProviders.forEach(provider => {
    const providerSales = purchasesIn2017.filter(purchase =>{
        return provider === purchase.credit.credit_provider;
    });

    // console.log(provider, "gave", providerSales.length, "loans")

    if (providerSales.length > highest.creditProvider.totalLoans) {
        highest.creditProvider.name = provider
        highest.creditProvider.totalLoans = providerSales.length
    }
})

console.log(highest.creditProvider.name, "provided the most loans with", highest.creditProvider.totalLoans)

// ------------------------------------------------------------------
// [x] In which month did zero cars get sold?
// SEE ABOVE
// ------------------------------------------------------------------
