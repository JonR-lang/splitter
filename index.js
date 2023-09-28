const billInput = document.querySelector('#bill');
const btnPercent = document.querySelectorAll('.btn-percent');
const customNumber = document.querySelector('#custom-number');
const numberPeople = document.querySelector('#numberpeople');
const resetBtn = document.querySelector('.reset-btn');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const errorMessage = document.querySelector('.error-message');
console.log(customNumber)

//This function takes a conditional statement, which check if the input values are filled. Once they are filled, the reset button becomes active and the calculations
//are perfomed. If the the input values are not filled, or should the user clear the input field, the calculations are reversed and they return to their default values,
//which is zero.

function checkInputs() {
        errorMessage.textContent = "";
        numberPeople.classList.remove('error');
    if (billInput.value && (numberPeople.value && numberPeople.value !== '0')) {
        //The below code assigns and active class to the reset button, making it hoverable and clickable.
        resetBtn.classList.add('active');
        let totalPerPerson;
        let selectedTip = '';
        //this code directly below iterates over all the buttons with a percentage on it, adding an event listener to each of them, if one of the buttons are clicked
        //it first removes any value that the user might have put in the custom input field, then it removes the active class of any previous button. Finally, the text value of 
        //the clicked button is grasped and used for the calculations neccesary.
        btnPercent.forEach(item => {
            item.addEventListener('click', () => {
                customNumber.value = '';
                btnPercent.forEach(element => {
                    element.classList.remove('active');
                })
                selectedTip = parseInt(item.textContent);

                //This block of code below performs the calculation under the condition that the user must have clicked a button, the input value must be filled and the number of
                //people value is also filled. After perfoming the calculation, it then presents the result of the calculation. If the above conditions are not met, then there are
                //no results displayed.

                if (selectedTip && billInput.value && (numberPeople.value && numberPeople.value !== '0')) {
                    totalPerPerson = `$${(((billInput.value.trim()*(selectedTip/100))/numberPeople.value.trim())+(Number(billInput.value.trim()/numberPeople.value.trim()))).toFixed(2)}`;
                    totalAmount.textContent = totalPerPerson;
                    tipAmount.textContent = `$${((billInput.value.trim()*(selectedTip/100))/numberPeople.value.trim()).toFixed(2)}`
                    item.classList.add('active');
                } else {
                    totalAmount.textContent = '$0.00';
                    tipAmount.textContent = '$0.00';
                }
            })
        })

        customNumber.addEventListener('input', () => {
            btnPercent.forEach(element => {
                element.classList.remove('active');
            })
            selectedTip = Number(customNumber.value.trim());
            if (selectedTip && billInput.value && (numberPeople.value && numberPeople.value !== '0')) {
                totalPerPerson = `$${(((billInput.value.trim()*(selectedTip/100))/numberPeople.value.trim())+(Number(billInput.value.trim()/numberPeople.value.trim()))).toFixed(2)}`;
                totalAmount.textContent = totalPerPerson;
                tipAmount.textContent = `$${((billInput.value.trim()*(selectedTip/100))/numberPeople.value.trim()).toFixed(2)}`
            } else {
                totalAmount.textContent = '$0.00';
                tipAmount.textContent = '$0.00';
            }
        })

        //The below block of the code is the primary calculation performed if the billInput value and the number of people value are filled. It does this irrespective of the conditions
        //above. It does this irrespective of if a tip percentages is selected.
        totalPerPerson = `$${(billInput.value.trim()/numberPeople.value.trim()).toFixed(2)}`;
        totalAmount.textContent = totalPerPerson;
    
    } else if (numberPeople.value.trim() === '0') {
       
        errorMessage.textContent = "Can't be zero";
        numberPeople.classList.add('error');

    } else {

        //The code below just translates thus: If the bill Input value AND the number of people input field are not filled(no pun intended), The active class from the reset button should
        //be removed, the total amount and the tip amount should revert to their default values, which is zero, and the active class for all the tip percentage buttons should be removed,
        //including any value in the custom input field.

        resetBtn.classList.remove('active');
        totalAmount.textContent = '$0.00';
        tipAmount.textContent = '$0.00';
        btnPercent.forEach(element => {
            element.classList.remove('active');
        })
        customNumber.value = '';
    }
        
}

/*This is the event listener for the bill input and the input for the number of people which takes
a call back function called checkInputs.*/

billInput.addEventListener('input', checkInputs);
numberPeople.addEventListener('input', checkInputs);


//For the reset button, which resets everything to zero.

resetBtn.addEventListener('click', () => {
    resetBtn.classList.remove('active');
    totalAmount.textContent = '$0.00';
    tipAmount.textContent = '$0.00';
    customNumber.value = '';
    billInput.value = '';
    numberPeople.value = '';
    btnPercent.forEach(item => {
        item.classList.remove('active');
    })
    errorMessage.textContent = "";
    numberPeople.classList.remove('error');
       
})
