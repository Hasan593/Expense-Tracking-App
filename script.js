
const deposit = document.getElementById('deposit-amount');

const error = document.getElementById('deposit-error');

const depositAmount = document.getElementById('amount');
const currentAmount = document.getElementById('balance-amount');

//                                       Deposit Button Event handler                               //

document.getElementById('deposit-button').addEventListener('click', () => {
    let depositValue  = parseInt(deposit.value);

    if (deposit.value === '') {
        error.classList.remove('hide');
        error.innerText = `Deposit can't be empoty.....`
    }else if (depositValue < 0) {
        error.classList.remove('hide');
        error.innerText = `Invalid deposit value.....`
    }else{
        error.classList.add('hide');
        depositAmount.innerText = parseInt(depositAmount.innerText) + depositValue;
        currentAmount.innerText = parseInt(currentAmount.innerText) + depositValue;
        deposit.value = '';
    }
});


const productTitle = document.getElementById('product-title');
const userAmount = document.getElementById('user-amount');

const errorMessage = document.getElementById('product-title-error');

const expenseAmount = document.getElementById('expenses-value');


//                              Buy Product Event Handler                                           //

document.getElementById('expense-amount-button').addEventListener('click', (e) => {
    e.preventDefault();

    if (!productTitle.value || !userAmount.value) {
        errorMessage.classList.remove('hide');
        errorMessage.innerText = `Expense value can't empty.....`;

    }else if (productTitle.value.trim().length <= 0 || userAmount.value <= 0) {
        errorMessage.classList.remove('hide');
        errorMessage.innerText = `In-valid data.....`;

    }else if (currentAmount.innerText <= 0) {
        errorMessage.classList.remove('hide');
        errorMessage.innerText = `Your balance is not enaugh.....`;

    }else{
        errorMessage.classList.add('hide');

        const expenDiture = parseInt(userAmount.value);
        const sum = parseInt(expenseAmount.innerText) + expenDiture;
        expenseAmount.innerText = sum;
        const totalBalance = parseInt(currentAmount.innerText) - expenDiture;
        currentAmount.innerText = totalBalance;

        listCreator(productTitle.value, userAmount.value);

        productTitle.value = '';
        userAmount.value = '';
    }
});


//                                     Sublist Function                                         //

const list = document.getElementById('list');

const listCreator = (expenseName, expenseValue) => {
    // <div>
    //     <p></p>
    //     <p></p>
    // </div>

    const sublist = document.createElement('div');
    sublist.classList.add('sublist-content', 'flex-space');
    sublist.innerHTML = `<p class="product">${expenseName}</p> <p class="amount">${expenseValue}</p>`;

    const editButton = document.createElement('button');
    editButton.classList.add('edit', 'fa-solid', 'fa-pen-to-square');
    editButton.style.fontSize = '1.2em';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('edit', 'fa-solid', 'fa-trash-can');
    deleteButton.style.fontSize = '1.2em';

    //                              Edit Button Eventhandler                                        //

    editButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        modifyElement(editButton, true);
    });

    //                              Delete Button Eventhandler                                        //

    deleteButton.addEventListener('click', () => {
        modifyElement(deleteButton);
    });

    sublist.appendChild(editButton);
    sublist.appendChild(deleteButton);
    list.appendChild(sublist);
};


//                                      Edit button Fuction                                      //
      
const modifyElement = (element, edit = false) => {

    const parentDiv = element.parentElement;
    const parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        userAmount.value = parentAmount;
        productTitle.value = parentDiv.querySelector(".product").innerText;
    }

    currentAmount.innerText = parseInt(currentAmount.innerText) + parseInt(parentAmount);
    expenseAmount.innerText = parseInt(expenseAmount.innerText) - parseInt(parentAmount);

    parentDiv.remove();
};