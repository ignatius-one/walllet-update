const button = document.getElementById('box-day-nigth');
button.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    button.classList.toggle('active')
})

// ------------------ comienza la interaccion  
// class father 
class Data {
    constructor(description, value) {
        this._description = description
        this._value = value
    }
    get description() {
       return this._description
    }
    set description(description) {
        this._description = description
    }
    get value() {
       return this._value
    }
    set value(value) {
        this._value = value
    }
}
// child class 
class Expenses extends Data{
    static numId = 0 
    constructor(description, value,) {
        super(description, value)
        this._id = ++Expenses.numId
    }
    get id() {
    return this._id
    }
}
// child class 
class Income extends Data{
    static numId = 0 
    constructor(description, value,) {
        super(description, value)
        this._id = ++Expenses.numId
    }
    get id() {
       return this._id
    }
}
// ------------ const income ----- 
const income = [
    new Income('ventas', 899),
    new Income('ventas', 667)
]
// ----------- const Expenses 
const expenses = [
    new Expenses('food', 567),
    new Expenses('agua', 267)
]
// -----------load information inside HTML 
let loadPage = () => {
    loadInfo()
    Loadincome()
    LoadExpenses()
}
// ----------- total income  ---- 
let Totalincome = () => {
    let incomes = 0
    for (let incomevar of income ) {
        incomes += incomevar.value
    }
    return incomes
}
// ----- total expenses 
let Totalexpenses = () => {
    let expense = 0
    for (let expensevar of expenses) {
        expense += expensevar.value
    }
    return expense
}
// ------ load info 
let loadInfo = () => {
    let budget = Totalincome()-Totalexpenses()
    // ----- return in html 
    document.getElementById('Budget').innerHTML = formatCurrency(budget) 
    document.getElementById('income').innerHTML =  `+${formatCurrency(Totalincome())}` 
    document.getElementById('expenses').innerHTML =  `-${formatCurrency(Totalexpenses())}`
}
// ------- fromat currency in js 
const formatCurrency = (value) => {
   return value.toLocaleString('en-US',{style:'currency',currency:'USD',minmumFractionDigits:2})
}



// ------ load incomes --------
const Loadincome = () => {
    let incomeHtml = ''
    for (incomeH of income) {
        incomeHtml += AddIncome(incomeH)
    }
    document.getElementById('list-income').innerHTML = incomeHtml 
}
// --------- code html inside well
const AddIncome = (incomeH) => {
    let incomeHTML = `
    <div class="element-style">
        <div class="Element-description">${incomeH.description}</div>
        <div class="element-value">+${formatCurrency(incomeH.value)}</div>
        <button class="btn-delte"><i class="fas fa-times" onclick="DelteIncome(${incomeH.Id})"></i></button>                        
        </div>
    `
    return incomeHTML
}
// ---------------------- delte elements income weell 
const DelteIncome = (id)=>{
    let indexincome = income.findIndex(incomeH => incomeH.Id === id)
    income.splice(indexincome, 1)
    loadInfo()
    Loadincome()
}





// ------ load expenses --------
const LoadExpenses = () => {
    let egresoHtml = ''
    for (valuesexpense of expenses) {
        egresoHtml += AddExpenses(valuesexpense)
    }
    document.getElementById('list-Expenses').innerHTML = egresoHtml 
}
// --------- code html inside 
const AddExpenses = (valuesexpense) => {
    let Expeseshtml = `
    <div class="element-style-e">
            <div class="Element-description-e">${valuesexpense.description}</div>
            <div class="element-value-e">-$${valuesexpense.value}</div>
            <button class="btn-delte-e"><i class="fas fa-times" onclick="DelteExpenses(${valuesexpense.Id})"></i></button>                        
     </div>
    `
    return Expeseshtml
}
// --------- delte expenses 
const DelteExpenses = (id)=>{
    let indexexpenses = expenses.findIndex(valuesexpense => valuesexpense.Id === id)
    expenses.splice(indexexpenses, 1)
    loadInfo()
    LoadExpenses()
}


// ------ add new elements here  
const addnewElement = () => {
    let form = document.forms['take-new']
    let type = form['type']
    let description = form['description']
    let value = form['value']
    if (description.value !== '' && value.value !== '') {
        if (type.value == 'income') {
            income.push(new income(description.value, +value.value))
            loadInfo()
            Loadincome()
        }else if (type.value == 'expenses') {
            expenses.push(new expenses(description.value, +value.value))
            loadInfo()
            LoadExpenses()
        }
    }
}